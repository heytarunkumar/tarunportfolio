import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GmailService, TARGET_GMAIL_ACCOUNT } from '../../services/gmailService';
import type { GmailThread, GmailAccount, SendMailRequest } from '../../types/gmail';

import { MailFolderSidebar } from '../components/mail/MailFolderSidebar';
import { MailMessageList } from '../components/mail/MailMessageList';
import { MailThreadDetail } from '../components/mail/MailThreadDetail';
import { MailComposeModal } from '../components/mail/MailComposeModal';
import { MailSettingsPanel } from '../components/mail/MailSettingsPanel';

export const AdminMailPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Navigation & View State
  const [currentFolder, setCurrentFolder] = useState<string>('INBOX');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);

  // Mail Data State
  const [account, setAccount] = useState<GmailAccount>(() => GmailService.getAccount());
  const [threads, setThreads] = useState<GmailThread[]>(() => GmailService.getThreads('INBOX'));
  const [labels, setLabels] = useState(() => GmailService.getLabels());
  const [drafts, setDrafts] = useState(() => GmailService.getDrafts());
  const [savedMessage, setSavedMessage] = useState<string>('');

  // Handle Google OAuth Callback code parameter
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      (async () => {
        await GmailService.exchangeAuthCode(code);
        setAccount(GmailService.getAccount());
        setSavedMessage(`Google OAuth 2.0 authorization successful for ${TARGET_GMAIL_ACCOUNT}!`);
        
        searchParams.delete('code');
        searchParams.delete('state');
        setSearchParams(searchParams);

        setTimeout(() => setSavedMessage(''), 4000);
      })();
    }
  }, [searchParams, setSearchParams]);

  // Load threads whenever currentFolder or searchQuery changes
  useEffect(() => {
    let list: GmailThread[] = [];
    if (searchQuery.trim()) {
      list = GmailService.searchMail({ q: searchQuery });
    } else {
      list = GmailService.getThreads(currentFolder);
    }
    setThreads(list);

    // Auto-select first thread if available and none selected
    if (list.length > 0 && !selectedThreadId) {
      setSelectedThreadId(list[0].id);
    } else if (list.length === 0) {
      setSelectedThreadId(null);
    }
  }, [currentFolder, searchQuery, selectedThreadId]);

  const refreshMailbox = () => {
    setAccount(GmailService.getAccount());
    setLabels(GmailService.getLabels());
    setDrafts(GmailService.getDrafts());
    
    let list: GmailThread[] = [];
    if (searchQuery.trim()) {
      list = GmailService.searchMail({ q: searchQuery });
    } else {
      list = GmailService.getThreads(currentFolder);
    }
    setThreads(list);

    setSavedMessage('Mailbox synced with Gmail API!');
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleSelectFolder = (folderId: string) => {
    setCurrentFolder(folderId);
    setSearchQuery('');
    setSelectedThreadId(null);
  };

  const handleToggleStar = (threadId: string) => {
    GmailService.toggleThreadStar(threadId);
    refreshMailbox();
  };

  const handleToggleUnread = (threadId: string) => {
    GmailService.toggleThreadUnread(threadId);
    refreshMailbox();
  };

  const handleArchive = (threadId: string) => {
    GmailService.archiveThread(threadId);
    if (selectedThreadId === threadId) setSelectedThreadId(null);
    refreshMailbox();
    setSavedMessage('Conversation archived.');
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleTrash = (threadId: string) => {
    GmailService.trashThread(threadId);
    if (selectedThreadId === threadId) setSelectedThreadId(null);
    refreshMailbox();
    setSavedMessage('Conversation moved to Trash.');
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleSendMail = (req: SendMailRequest) => {
    GmailService.sendEmail(req);
    refreshMailbox();
    setSavedMessage(`Email sent successfully to "${req.to}"!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveDraft = (req: SendMailRequest) => {
    GmailService.saveDraft(req);
    refreshMailbox();
    setSavedMessage('Draft saved to Gmail Drafts.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDisconnect = () => {
    GmailService.disconnectGmail();
    setAccount(GmailService.getAccount());
    setSavedMessage('Disconnected Gmail account.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const activeThread = selectedThreadId ? GmailService.getThreadById(selectedThreadId) || null : null;
  const isConnected = account.connected;

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col font-sans bg-[#050403] text-[#E8DFD8] border border-[#8C6D4F]/30 rounded-sm overflow-hidden shadow-2xl">
      
      {/* Top Banner Alert */}
      {savedMessage && (
        <div className="p-3 border-b border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-xs font-mono flex items-center justify-between z-20 shrink-0">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* Main 3-Pane Viewport Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Pane 1: Left Navigation Sidebar */}
        <MailFolderSidebar
          currentFolder={currentFolder}
          onSelectFolder={handleSelectFolder}
          onOpenCompose={() => setIsComposeOpen(true)}
          labels={labels}
          unreadCount={account.unreadCount || 0}
          draftsCount={drafts.length}
          isConnected={isConnected}
        />

        {/* Settings Route View vs Main Mailbox Views */}
        {currentFolder === 'SETTINGS' ? (
          <MailSettingsPanel
            credentials={GmailService.getOAuthCredentials()}
            onSaveCredentials={(creds) => {
              GmailService.saveOAuthCredentials(creds);
              refreshMailbox();
            }}
            onDisconnect={handleDisconnect}
            isConnected={isConnected}
          />
        ) : (
          <>
            {/* Pane 2: Middle Conversation List */}
            <MailMessageList
              threads={threads}
              selectedThreadId={selectedThreadId}
              onSelectThread={(id) => setSelectedThreadId(id)}
              onToggleStar={handleToggleStar}
              onArchive={handleArchive}
              onTrash={handleTrash}
              onRefresh={refreshMailbox}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
              currentFolder={currentFolder}
            />

            {/* Pane 3: Right Thread Detail & Reading Viewport */}
            <MailThreadDetail
              thread={activeThread}
              onToggleStar={handleToggleStar}
              onToggleUnread={handleToggleUnread}
              onArchive={handleArchive}
              onTrash={handleTrash}
              onSendReply={handleSendMail}
              onClose={() => setSelectedThreadId(null)}
            />
          </>
        )}
      </div>

      {/* Compose Modal Dialog */}
      <MailComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendMail}
        onSaveDraft={handleSaveDraft}
      />

    </div>
  );
};

export default AdminMailPage;
