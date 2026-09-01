import React, { useState } from 'react';
import type { GmailThread } from '../../../types/gmail';

interface MailMessageListProps {
  threads: GmailThread[];
  selectedThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onToggleStar: (threadId: string) => void;
  onArchive: (threadId: string) => void;
  onTrash: (threadId: string) => void;
  onRefresh: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentFolder: string;
}

export const MailMessageList: React.FC<MailMessageListProps> = ({
  threads,
  selectedThreadId,
  onSelectThread,
  onToggleStar,
  onArchive,
  onTrash,
  onRefresh,
  searchQuery,
  onSearchChange,
  currentFolder,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(threads.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkArchive = () => {
    selectedIds.forEach((id) => onArchive(id));
    setSelectedIds([]);
  };

  const handleBulkTrash = () => {
    selectedIds.forEach((id) => onTrash(id));
    setSelectedIds([]);
  };

  const allSelected = threads.length > 0 && selectedIds.length === threads.length;

  return (
    <div className="w-full lg:w-96 bg-[#070504] border-b lg:border-b-0 lg:border-r border-[#8C6D4F]/30 flex flex-col shrink-0 font-mono text-xs select-none h-full">
      
      {/* Top Search & Filter Bar */}
      <div className="p-3 border-b border-[#8C6D4F]/30 bg-[#0A0806] space-y-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mail (e.g. from:elena or subject:API)..."
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white pl-8 pr-8 py-2 rounded-sm outline-none text-xs"
          />
          <span className="absolute left-2.5 top-2 text-[#8C6D4F]">🔍</span>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2 text-[#8C6D4F] hover:text-white font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#D4AF37] cursor-pointer"
              title="Select All"
            />
            <span className="text-[10px] text-[#8C6D4F] uppercase font-bold">
              {currentFolder} ({threads.length})
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {selectedIds.length > 0 ? (
              <>
                <button
                  onClick={handleBulkArchive}
                  className="px-2 py-1 bg-[#1E1914] border border-[#8C6D4F]/40 text-[#D4AF37] text-[10px] hover:border-[#D4AF37] rounded-sm"
                  title="Archive Selected"
                >
                  📥 ARCHIVE ({selectedIds.length})
                </button>
                <button
                  onClick={handleBulkTrash}
                  className="px-2 py-1 bg-red-950/30 border border-red-500/40 text-red-300 text-[10px] hover:bg-red-900/50 rounded-sm font-bold"
                  title="Trash Selected"
                >
                  🗑️ TRASH ({selectedIds.length})
                </button>
              </>
            ) : (
              <button
                onClick={onRefresh}
                className="px-2 py-1 bg-[#120F0C] border border-[#8C6D4F]/30 text-[#C4B5A5] text-[10px] hover:text-white rounded-sm flex items-center space-x-1"
                title="Refresh Mailbox"
              >
                <span>🔄</span>
                <span>REFRESH</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Threads List Viewport */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#8C6D4F]/15">
        {threads.length === 0 ? (
          <div className="p-8 text-center text-[#8C6D4F] space-y-2">
            <span className="text-2xl block">📭</span>
            <p className="text-xs uppercase">No conversations in {currentFolder}</p>
          </div>
        ) : (
          threads.map((thread) => {
            const isSelected = selectedThreadId === thread.id;
            const isChecked = selectedIds.includes(thread.id);
            const firstMsg = thread.messages[0];
            const senderName = firstMsg?.from?.name || firstMsg?.from?.email || 'Unknown';
            const hasAttachments = thread.messages.some((m) => m.attachments && m.attachments.length > 0);

            return (
              <div
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={`p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1E1914] border-l-4 border-[#D4AF37]'
                    : thread.unread
                    ? 'bg-[#120F0C] hover:bg-[#18130E]'
                    : 'bg-[#070504] opacity-80 hover:opacity-100 hover:bg-[#0F0C09]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center space-x-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onClick={(e) => handleToggleCheck(thread.id, e)}
                      className="w-3.5 h-3.5 accent-[#D4AF37] shrink-0"
                    />

                    {/* Star Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(thread.id);
                      }}
                      className={`text-sm shrink-0 transition-transform ${
                        thread.starred ? 'text-[#D4AF37] scale-110' : 'text-[#8C6D4F]/50 hover:text-[#D4AF37]'
                      }`}
                    >
                      {thread.starred ? '★' : '☆'}
                    </button>

                    <span
                      className={`font-bold text-xs truncate ${
                        thread.unread ? 'text-white' : 'text-[#C4B5A5]'
                      }`}
                    >
                      {senderName}
                    </span>

                    {thread.messages.length > 1 && (
                      <span className="text-[10px] text-[#8C6D4F] font-bold">
                        ({thread.messages.length})
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-[#8C6D4F] shrink-0">
                    {thread.lastMessageDate?.split(' ')[1] || 'Today'}
                  </span>
                </div>

                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs truncate ${
                        thread.unread ? 'text-white font-bold' : 'text-[#E8DFD8]'
                      }`}
                    >
                      {thread.subject || '(No Subject)'}
                    </h4>

                    {hasAttachments && (
                      <span className="text-[10px] text-[#D4AF37] shrink-0" title="Has attachment">
                        📎
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#8C6D4F] line-clamp-1 font-sans">
                    {thread.snippet}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
