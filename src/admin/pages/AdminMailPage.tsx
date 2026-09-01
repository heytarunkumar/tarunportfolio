import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GmailService, TARGET_GMAIL_ACCOUNT } from '../../services/gmailService';
import type { GmailThread, GmailAccount, SendMailRequest } from '../../types/gmail';

import { OutlookCommandRibbon } from '../components/mail/OutlookCommandRibbon';
import { MailFolderSidebar } from '../components/mail/MailFolderSidebar';
import { MailMessageList } from '../components/mail/MailMessageList';
import { MailThreadDetail } from '../components/mail/MailThreadDetail';
import { MailComposeModal } from '../components/mail/MailComposeModal';
import { MailSettingsPanel } from '../components/mail/MailSettingsPanel';
import { OutlookPowerToolsModal } from '../components/mail/OutlookPowerToolsModal';

export const AdminMailPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Navigation & View State
  const [currentFolder, setCurrentFolder] = useState<string>('PORTFOLIO_INBOX');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [isPowerToolsOpen, setIsPowerToolsOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Keyboard Shortcuts Listener (c=Compose, r=Reply, f=Flag, e=Archive, d=Delete, s=Star)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || isComposeOpen || isPowerToolsOpen) {
        return;
      }

      if (e.key === 'c' || e.key === 'n') {
        e.preventDefault();
        setIsComposeOpen(true);
      } else if (e.key === 'f' && selectedThreadId) {
        e.preventDefault();
        handleToggleFlag(selectedThreadId);
      } else if (e.key === 's' && selectedThreadId) {
        e.preventDefault();
        handleToggleStar(selectedThreadId);
      } else if ((e.key === 'e' || e.key === 'y') && selectedThreadId) {
        e.preventDefault();
        handleArchive(selectedThreadId);
      } else if ((e.key === 'd' || e.key === 'Delete') && selectedThreadId) {
        e.preventDefault();
        handleTrash(selectedThreadId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedThreadId, isComposeOpen, isPowerToolsOpen]);

  // Mail Data State
  const [account, setAccount] = useState<GmailAccount>(() => GmailService.getAccount());
  const [threads, setThreads] = useState<GmailThread[]>(() => GmailService.getThreads('PORTFOLIO_INBOX'));
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

    setSavedMessage('Synced Outlook Mail Center with Gmail API!');
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

  const handleTogglePin = (threadId: string) => {
    GmailService.toggleThreadPin(threadId);
    refreshMailbox();
  };

  const handleToggleFlag = (threadId: string) => {
    GmailService.toggleThreadFlag(threadId);
    refreshMailbox();
  };

  const handleSetCategory = (threadId: string, category: string) => {
    GmailService.setThreadCategory(threadId, category);
    refreshMailbox();
    setSavedMessage(`Assigned Outlook category "${category}".`);
    setTimeout(() => setSavedMessage(''), 2500);
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

  const handleEmptyTrash = () => {
    GmailService.emptyTrash();
    setSelectedThreadId(null);
    refreshMailbox();
    setSavedMessage('All items permanently deleted from Trash.');
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleRestore = (threadId: string) => {
    GmailService.restoreFromTrash(threadId);
    refreshMailbox();
    setSavedMessage('Conversation restored back to Inbox.');
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
      
      {/* Top Microsoft Outlook Command Ribbon */}
      <OutlookCommandRibbon
        onOpenCompose={() => setIsComposeOpen(true)}
        onOpenPowerTools={() => setIsPowerToolsOpen(true)}
        selectedThreadId={selectedThreadId}
        onArchive={handleArchive}
        onTrash={handleTrash}
        onToggleUnread={handleToggleUnread}
        onTogglePin={handleTogglePin}
        onToggleFlag={handleToggleFlag}
        onSetCategory={handleSetCategory}
        onRefresh={refreshMailbox}
        isPinned={activeThread?.pinned || false}
        isFlagged={activeThread?.flagged || false}
        isUnread={activeThread?.unread || false}
        activeCategory={activeThread?.category || ''}
      />

      {/* Top Alert Banner */}
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
        {!isFullscreen && (
          <MailFolderSidebar
            currentFolder={currentFolder}
            onSelectFolder={handleSelectFolder}
            onOpenCompose={() => setIsComposeOpen(true)}
            labels={labels}
            unreadCount={account.unreadCount || 0}
            draftsCount={drafts.length}
            isConnected={isConnected}
          />
        )}

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
            {!isFullscreen && (
              <MailMessageList
                threads={threads}
                selectedThreadId={selectedThreadId}
                onSelectThread={(id) => setSelectedThreadId(id)}
                onToggleStar={handleToggleStar}
                onTogglePin={handleTogglePin}
                onToggleFlag={handleToggleFlag}
                onArchive={handleArchive}
                onTrash={handleTrash}
                onEmptyTrash={handleEmptyTrash}
                onRefresh={refreshMailbox}
                searchQuery={searchQuery}
                onSearchChange={(q) => setSearchQuery(q)}
                currentFolder={currentFolder}
              />
            )}

            {/* Pane 3: Right Thread Detail & Reading Viewport */}
            <MailThreadDetail
              thread={activeThread}
              onToggleStar={handleToggleStar}
              onToggleUnread={handleToggleUnread}
              onArchive={handleArchive}
              onTrash={handleTrash}
              onRestore={handleRestore}
              onSendReply={handleSendMail}
              onClose={() => setSelectedThreadId(null)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
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

      {/* Outlook Power Tools Modal */}
      <OutlookPowerToolsModal
        isOpen={isPowerToolsOpen}
        onClose={() => setIsPowerToolsOpen(false)}
      />

    </div>
  );
};

export default AdminMailPage;
