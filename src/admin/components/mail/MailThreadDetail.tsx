import React, { useState } from 'react';
import type { GmailThread, SendMailRequest } from '../../../types/gmail';
import { sanitizeHtml } from '../../../services/htmlSanitizer';
import { GmailService } from '../../../services/gmailService';

interface MailThreadDetailProps {
  thread: GmailThread | null;
  onToggleStar: (threadId: string) => void;
  onToggleUnread: (threadId: string) => void;
  onArchive: (threadId: string) => void;
  onTrash: (threadId: string) => void;
  onSendReply: (req: SendMailRequest) => void;
  onClose?: () => void;
}

export const MailThreadDetail: React.FC<MailThreadDetailProps> = ({
  thread,
  onToggleStar,
  onToggleUnread,
  onArchive,
  onTrash,
  onSendReply,
  onClose,
}) => {
  const [replyMode, setReplyMode] = useState<'reply' | 'replyAll' | 'forward' | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [replySubject, setReplySubject] = useState('');

  if (!thread) {
    return (
      <div className="flex-1 bg-[#050403] p-8 flex flex-col items-center justify-center text-center text-[#8C6D4F] font-mono text-xs h-full">
        <span className="text-4xl block mb-3 opacity-40">📨</span>
        <h3 className="text-sm text-[#C4B5A5] font-bold uppercase tracking-wider">
          SELECT A CONVERSATION TO READ
        </h3>
        <p className="text-[11px] max-w-xs mt-1">
          Choose an email thread from the mailbox list to inspect messages, download attachments, or send a reply.
        </p>
      </div>
    );
  }

  const lastMsg = thread.messages[thread.messages.length - 1];

  const startReply = (mode: 'reply' | 'replyAll' | 'forward') => {
    setReplyMode(mode);

    if (mode === 'reply') {
      setReplyTo(lastMsg.from?.email || '');
      setReplySubject(`Re: ${thread.subject || ''}`);
    } else if (mode === 'replyAll') {
      const recipients = [lastMsg.from?.email, lastMsg.to, lastMsg.cc].filter(Boolean).join(', ');
      setReplyTo(recipients);
      setReplySubject(`Re: ${thread.subject || ''}`);
    } else if (mode === 'forward') {
      setReplyTo('');
      setReplySubject(`Fwd: ${thread.subject || ''}`);
      setReplyBody(`\n\n---------- Forwarded message ---------\nFrom: ${lastMsg.from?.name} <${lastMsg.from?.email}>\nDate: ${lastMsg.dateStr}\nSubject: ${lastMsg.subject}\n\n${lastMsg.bodyText || ''}`);
    }
  };

  const handleSendReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyTo.trim() || !replyBody.trim()) return;

    onSendReply({
      to: replyTo.trim(),
      subject: replySubject,
      body: replyBody,
      threadId: thread.id,
      inReplyTo: lastMsg.id,
    });

    setReplyMode(null);
    setReplyBody('');
  };

  return (
    <div className="flex-1 bg-[#050403] flex flex-col h-full overflow-hidden font-mono text-xs">
      
      {/* Thread Action Header */}
      <div className="p-4 border-b border-[#8C6D4F]/30 bg-[#0A0806] flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-3 truncate">
          <button
            type="button"
            onClick={() => onToggleStar(thread.id)}
            className={`text-lg transition-transform ${
              thread.starred ? 'text-[#D4AF37] scale-110' : 'text-[#8C6D4F] hover:text-[#D4AF37]'
            }`}
          >
            {thread.starred ? '★' : '☆'}
          </button>

          <h2 className="text-sm sm:text-base text-white font-bold tracking-wider truncate">
            {thread.subject || '(No Subject)'}
          </h2>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5] hover:text-white rounded-sm text-[10px] uppercase font-bold"
            title="Print Conversation"
          >
            🖨️ PRINT
          </button>

          <button
            type="button"
            onClick={() => onToggleUnread(thread.id)}
            className="px-3 py-1 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5] hover:text-white rounded-sm text-[10px] uppercase font-bold"
          >
            {thread.unread ? 'MARK READ ✓' : 'MARK UNREAD ✉️'}
          </button>
          
          <button
            type="button"
            onClick={() => onArchive(thread.id)}
            className="px-3 py-1 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#D4AF37] hover:border-[#D4AF37] rounded-sm text-[10px] uppercase font-bold"
          >
            📥 ARCHIVE
          </button>

          <button
            type="button"
            onClick={() => onTrash(thread.id)}
            className="px-3 py-1 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 rounded-sm text-[10px] uppercase font-bold"
          >
            🗑️ TRASH
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#8C6D4F] hover:text-white text-lg font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Messages Thread Timeline */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {thread.messages.map((msg, idx) => {
          const isSender = msg.from?.email.includes('tarunsinghchaudharyy') || msg.from?.name.includes('Tarun');
          const cleanBody = msg.bodyHtml ? sanitizeHtml(msg.bodyHtml) : msg.bodyText || '';

          return (
            <div
              key={msg.id || idx}
              className={`border rounded-sm p-4 sm:p-6 space-y-4 shadow-lg ${
                isSender
                  ? 'bg-[#0E0C0A] border-[#8C6D4F]/30'
                  : 'bg-[#0A0806] border-[#8C6D4F]/20'
              }`}
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#8C6D4F]/20 pb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-black shrink-0 ${
                      isSender ? 'bg-[#D4AF37]' : 'bg-[#C4B5A5]'
                    }`}
                  >
                    {msg.from?.name?.charAt(0) || 'U'}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-sm">{msg.from?.name || 'Unknown'}</span>
                      <span className="text-[#8C6D4F] text-[11px]">&lt;{msg.from?.email}&gt;</span>
                    </div>
                    <span className="text-[10px] text-[#8C6D4F] block">To: {msg.to}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <span className="text-[10px] text-[#8C6D4F]">{msg.dateStr || 'Just now'}</span>
                </div>
              </div>

              {/* Message HTML / Plaintext Body */}
              <div
                className="text-[#E8DFD8] text-xs font-sans leading-relaxed whitespace-pre-wrap selection:bg-[#cbb59d] selection:text-black"
                dangerouslySetInnerHTML={{ __html: cleanBody }}
              />

              {/* Message Attachments */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="pt-3 border-t border-[#8C6D4F]/20 space-y-2">
                  <span className="text-[10px] text-[#8C6D4F] uppercase font-bold block">
                    📎 ATTACHMENTS ({msg.attachments.length}):
                  </span>
                  <div className="flex flex-wrap gap-3 font-mono text-xs">
                    {msg.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="p-2.5 border border-[#8C6D4F]/40 bg-[#120F0C] rounded-sm flex items-center space-x-2 hover:border-[#D4AF37]"
                      >
                        <span>📄</span>
                        <div>
                          <span className="text-white font-bold block text-[11px] truncate max-w-[180px]">
                            {att.filename}
                          </span>
                          <span className="text-[9px] text-[#8C6D4F]">
                            {(att.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <a
                          href={att.dataUrl || '#'}
                          download={att.filename}
                          className="px-2 py-1 bg-[#1E1914] text-[#D4AF37] text-[10px] border border-[#D4AF37]/40 rounded-sm font-bold uppercase hover:bg-[#D4AF37] hover:text-black"
                        >
                          DOWNLOAD
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Reply Action Buttons */}
        {!replyMode && (
          <div className="flex items-center space-x-3 pt-4 border-t border-[#8C6D4F]/30 font-mono text-xs">
            <button
              type="button"
              onClick={() => startReply('reply')}
              className="px-4 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-wider hover:bg-[#E2C054]"
            >
              ↩️ REPLY
            </button>
            <button
              type="button"
              onClick={() => startReply('replyAll')}
              className="px-4 py-2 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#D4AF37] font-bold uppercase tracking-wider hover:border-[#D4AF37]"
            >
              ↩️↩️ REPLY ALL
            </button>
            <button
              type="button"
              onClick={() => startReply('forward')}
              className="px-4 py-2 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5] uppercase tracking-wider hover:text-white"
            >
              ↪️ FORWARD
            </button>
          </div>
        )}

        {/* Inline Reply Form */}
        {replyMode && (
          <form onSubmit={handleSendReplySubmit} className="p-5 border border-[#D4AF37] bg-[#0A0806] rounded-sm space-y-4 font-mono text-xs animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
              <span className="text-[#D4AF37] font-bold uppercase">
                {replyMode === 'reply' ? 'REPLY TO CONVERSATION' : replyMode === 'replyAll' ? 'REPLY ALL' : 'FORWARD CONVERSATION'}
              </span>
              <button
                type="button"
                onClick={() => setReplyMode(null)}
                className="text-[#8C6D4F] hover:text-white font-bold"
              >
                ✕ CANCEL
              </button>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">RECIPIENT *</label>
              <input
                type="email"
                required
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-2.5 rounded-sm outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#8C6D4F] uppercase">MESSAGE PAYLOAD *</label>

                <div className="flex items-center space-x-3">
                  <select
                    onChange={(e) => {
                      const tpl = GmailService.getTemplates().find((t) => t.id === e.target.value);
                      if (tpl) {
                        setReplyBody((prev) => (prev ? prev + '\n\n' + tpl.body : tpl.body));
                      }
                    }}
                    className="bg-[#120F0C] border border-[#8C6D4F]/30 text-[#D4AF37] text-[10px] p-1 rounded-sm outline-none font-bold"
                  >
                    <option value="">-- Quick Template --</option>
                    {GmailService.getTemplates().map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      const defaultSig = GmailService.getSignatures().find((s) => s.isDefault) || GmailService.getSignatures()[0];
                      if (defaultSig) {
                        setReplyBody((prev) => prev + '\n\n' + defaultSig.contentHtml);
                      }
                    }}
                    className="text-[10px] text-[#D4AF37] hover:underline font-bold"
                  >
                    + SIGNATURE
                  </button>
                </div>
              </div>
              <textarea
                required
                rows={5}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Type your response message..."
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none resize-none font-sans text-xs"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-wider hover:bg-[#E2C054]"
              >
                SEND MAIL RESPONSE 🚀
              </button>
              <button
                type="button"
                onClick={() => setReplyMode(null)}
                className="px-4 py-2.5 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5] uppercase"
              >
                DISCARD
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
