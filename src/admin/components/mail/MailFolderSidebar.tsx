import React from 'react';
import { TARGET_GMAIL_ACCOUNT } from '../../../services/gmailService';
import type { GmailLabel } from '../../../types/gmail';

interface MailFolderSidebarProps {
  currentFolder: string;
  onSelectFolder: (folder: string) => void;
  onOpenCompose: () => void;
  labels: GmailLabel[];
  unreadCount: number;
  draftsCount: number;
  isConnected: boolean;
}

export const MailFolderSidebar: React.FC<MailFolderSidebarProps> = ({
  currentFolder,
  onSelectFolder,
  onOpenCompose,
  labels,
  unreadCount,
  draftsCount,
  isConnected,
}) => {
  const folders = [
    { id: 'PORTFOLIO_INBOX', name: 'Portfolio Enquiries', icon: '📬', badge: unreadCount > 0 ? unreadCount : null },
    { id: 'INBOX', name: 'All Gmail Inbox', icon: '📥', badge: null },
    { id: 'STARRED', name: 'Starred', icon: '⭐', badge: null },
    { id: 'SENT', name: 'Sent Mail', icon: '📤', badge: null },
    { id: 'DRAFTS', name: 'Drafts', icon: '📝', badge: draftsCount > 0 ? draftsCount : null },
    { id: 'SPAM', name: 'Spam', icon: '⚠️', badge: null },
    { id: 'TRASH', name: 'Trash', icon: '🗑️', badge: null },
    { id: 'SEARCH', name: 'Search Engine', icon: '🔍', badge: null },
    { id: 'SETTINGS', name: 'OAuth & Settings', icon: '⚙️', badge: null },
  ];

  const userLabels = labels.filter((l) => l.type === 'user');

  return (
    <aside className="w-full lg:w-64 bg-[#0A0806] border-b lg:border-b-0 lg:border-r border-[#8C6D4F]/30 p-4 flex flex-col justify-between shrink-0 font-mono text-xs select-none">
      <div className="space-y-6">
        
        {/* Compose Button */}
        <button
          type="button"
          onClick={onOpenCompose}
          className="w-full py-3 px-4 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-wider hover:bg-[#E2C054] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all flex items-center justify-center space-x-2"
        >
          <span>✏️</span>
          <span>COMPOSE NEW MAIL</span>
        </button>

        {/* System Folders */}
        <div className="space-y-1">
          <span className="text-[10px] text-[#8C6D4F] uppercase tracking-widest px-2 block font-bold mb-2">
            MAILBOX FOLDERS
          </span>

          {folders.map((folder) => {
            const isActive = currentFolder === folder.id;

            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => onSelectFolder(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-sm transition-all text-left ${
                  isActive
                    ? 'bg-[#1E1914] text-[#D4AF37] border-l-2 border-[#D4AF37] font-semibold'
                    : 'text-[#C4B5A5] hover:bg-[#120F0C] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span>{folder.icon}</span>
                  <span className="tracking-wider">{folder.name}</span>
                </div>

                {folder.badge !== null && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${
                      folder.id === 'INBOX'
                        ? 'bg-amber-500 text-black'
                        : 'bg-[#8C6D4F]/40 text-white'
                    }`}
                  >
                    {folder.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Custom Labels */}
        <div className="space-y-1 pt-2 border-t border-[#8C6D4F]/20">
          <span className="text-[10px] text-[#8C6D4F] uppercase tracking-widest px-2 block font-bold mb-2">
            LABELS &amp; CATEGORIES
          </span>

          {userLabels.map((label) => {
            const isActive = currentFolder === label.id;
            const fg = label.color?.textColor || '#D4AF37';

            return (
              <button
                key={label.id}
                type="button"
                onClick={() => onSelectFolder(label.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-sm transition-all text-left ${
                  isActive
                    ? 'bg-[#1E1914] text-[#D4AF37] border-l-2 border-[#D4AF37] font-semibold'
                    : 'text-[#C4B5A5] hover:bg-[#120F0C] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: fg }}
                  />
                  <span className="tracking-wider truncate">{label.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Account Status Footer */}
      <div className="pt-4 mt-6 border-t border-[#8C6D4F]/30 space-y-1">
        <div className="flex items-center space-x-2 text-[10px]">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-[#8C6D4F] uppercase font-bold">GMAIL ACCOUNT:</span>
        </div>
        <span className="text-white text-[11px] font-bold block truncate" title={TARGET_GMAIL_ACCOUNT}>
          {TARGET_GMAIL_ACCOUNT}
        </span>
        <span className="text-[9px] text-[#8C6D4F] block">
          {isConnected ? '● Connected via OAuth 2.0' : '⚡ Local Sandbox Mode Active'}
        </span>
      </div>
    </aside>
  );
};
