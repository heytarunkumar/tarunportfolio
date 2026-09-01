import React, { useState } from 'react';

interface OutlookCommandRibbonProps {
  onOpenCompose: () => void;
  selectedThreadId: string | null;
  onArchive: (id: string) => void;
  onTrash: (id: string) => void;
  onToggleUnread: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleFlag: (id: string) => void;
  onSetCategory: (id: string, category: string) => void;
  onRefresh: () => void;
  isPinned?: boolean;
  isFlagged?: boolean;
  isUnread?: boolean;
  activeCategory?: string;
}

export const OutlookCommandRibbon: React.FC<OutlookCommandRibbonProps> = ({
  onOpenCompose,
  selectedThreadId,
  onArchive,
  onTrash,
  onToggleUnread,
  onTogglePin,
  onToggleFlag,
  onSetCategory,
  onRefresh,
  isPinned = false,
  isFlagged = false,
  isUnread = false,
  activeCategory = '',
}) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categories = [
    { name: 'Urgent', color: '#EF4444' },
    { name: 'Client Inquiry', color: '#10B981' },
    { name: 'Recruiter', color: '#F59E0B' },
    { name: 'Follow-up', color: '#3B82F6' },
    { name: 'Research', color: '#8B5CF6' },
  ];

  return (
    <div className="bg-[#0D0B08] border-b border-[#8C6D4F]/30 p-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs select-none shrink-0 shadow-md">
      
      {/* Left Action Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        
        {/* + New Mail */}
        <button
          type="button"
          onClick={onOpenCompose}
          className="px-4 py-2 bg-[#D4AF37] text-black font-bold uppercase rounded-sm hover:bg-[#E2C054] flex items-center space-x-1.5 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
        >
          <span>✏️</span>
          <span>New mail</span>
        </button>

        <div className="h-5 w-[1px] bg-[#8C6D4F]/30 mx-1 hidden sm:block" />

        {/* Delete */}
        <button
          type="button"
          disabled={!selectedThreadId}
          onClick={() => selectedThreadId && onTrash(selectedThreadId)}
          className="px-3 py-1.5 bg-[#120F0C] border border-[#8C6D4F]/30 text-[#E8DFD8] rounded-sm hover:border-red-500 hover:text-red-400 disabled:opacity-30 flex items-center space-x-1"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>

        {/* Archive */}
        <button
          type="button"
          disabled={!selectedThreadId}
          onClick={() => selectedThreadId && onArchive(selectedThreadId)}
          className="px-3 py-1.5 bg-[#120F0C] border border-[#8C6D4F]/30 text-[#E8DFD8] rounded-sm hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 flex items-center space-x-1"
        >
          <span>📥</span>
          <span>Archive</span>
        </button>

        {/* Mark Read / Unread */}
        <button
          type="button"
          disabled={!selectedThreadId}
          onClick={() => selectedThreadId && onToggleUnread(selectedThreadId)}
          className="px-3 py-1.5 bg-[#120F0C] border border-[#8C6D4F]/30 text-[#E8DFD8] rounded-sm hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 flex items-center space-x-1"
        >
          <span>✉️</span>
          <span>{isUnread ? 'Mark read' : 'Mark unread'}</span>
        </button>

        {/* Pin to Top */}
        <button
          type="button"
          disabled={!selectedThreadId}
          onClick={() => selectedThreadId && onTogglePin(selectedThreadId)}
          className={`px-3 py-1.5 border rounded-sm flex items-center space-x-1 transition-colors ${
            isPinned
              ? 'bg-[#1E1914] border-[#D4AF37] text-[#D4AF37] font-bold'
              : 'bg-[#120F0C] border-[#8C6D4F]/30 text-[#E8DFD8] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30'
          }`}
        >
          <span>📌</span>
          <span>{isPinned ? 'Unpin' : 'Pin'}</span>
        </button>

        {/* Flag for Follow-up */}
        <button
          type="button"
          disabled={!selectedThreadId}
          onClick={() => selectedThreadId && onToggleFlag(selectedThreadId)}
          className={`px-3 py-1.5 border rounded-sm flex items-center space-x-1 transition-colors ${
            isFlagged
              ? 'bg-amber-950/40 border-amber-500 text-amber-300 font-bold'
              : 'bg-[#120F0C] border-[#8C6D4F]/30 text-[#E8DFD8] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30'
          }`}
        >
          <span>🚩</span>
          <span>{isFlagged ? 'Unflag' : 'Flag'}</span>
        </button>

        {/* Categorize Dropdown */}
        <div className="relative">
          <button
            type="button"
            disabled={!selectedThreadId}
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="px-3 py-1.5 bg-[#120F0C] border border-[#8C6D4F]/30 text-[#E8DFD8] rounded-sm hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 flex items-center space-x-1"
          >
            <span>🏷️</span>
            <span>Categorize</span>
            {activeCategory && (
              <span className="px-1.5 py-0.2 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] rounded-sm font-bold">
                {activeCategory}
              </span>
            )}
          </button>

          {showCategoryMenu && selectedThreadId && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-[#0A0806] border border-[#8C6D4F]/40 rounded-sm shadow-xl z-30 py-1 space-y-1">
              <span className="text-[9px] text-[#8C6D4F] uppercase tracking-wider px-3 block font-bold">
                SELECT OUTLOOK CATEGORY
              </span>
              {categories.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    onSetCategory(selectedThreadId, c.name);
                    setShowCategoryMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#1E1914] flex items-center space-x-2 text-white text-xs"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Right Sync Refresh Status */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onRefresh}
          className="px-3 py-1.5 bg-[#120F0C] border border-[#8C6D4F]/30 text-[#C4B5A5] rounded-sm hover:text-white flex items-center space-x-1"
          title="Sync with Outlook / Gmail API"
        >
          <span>🔄</span>
          <span>Sync</span>
        </button>
      </div>

    </div>
  );
};
