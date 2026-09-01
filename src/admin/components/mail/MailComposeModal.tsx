import React, { useState } from 'react';
import { GmailService } from '../../../services/gmailService';
import type { SendMailRequest } from '../../../types/gmail';

interface MailComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (req: SendMailRequest) => void;
  onSaveDraft: (req: SendMailRequest) => void;
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
}

export const MailComposeModal: React.FC<MailComposeModalProps> = ({
  isOpen,
  onClose,
  onSend,
  onSaveDraft,
  initialTo = '',
  initialSubject = '',
  initialBody = '',
}) => {
  const [to, setTo] = useState(initialTo);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [attachments, setAttachments] = useState<{ filename: string; mimeType: string; dataUrl: string }[]>([]);
  const [autosaveTime, setAutosaveTime] = useState<string | null>(null);

  // Draft Autosave Effect (Runs every 8 seconds if body or subject typed)
  React.useEffect(() => {
    if (!isOpen) return;
    if (!subject.trim() && !body.trim()) return;

    const timer = setTimeout(() => {
      onSaveDraft({
        to: to.trim(),
        cc: cc.trim() || undefined,
        bcc: bcc.trim() || undefined,
        subject: subject.trim() || '(No Subject)',
        body,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      setAutosaveTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 8000);

    return () => clearTimeout(timer);
  }, [isOpen, to, cc, bcc, subject, body, attachments, onSaveDraft]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setAttachments((prev) => [
          ...prev,
          {
            filename: file.name,
            mimeType: file.type || 'application/octet-stream',
            dataUrl,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !body.trim()) return;

    onSend({
      to: to.trim(),
      cc: cc.trim() || undefined,
      bcc: bcc.trim() || undefined,
      subject: subject.trim() || '(No Subject)',
      body,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    onClose();
  };

  const handleDraftSubmit = () => {
    onSaveDraft({
      to: to.trim(),
      cc: cc.trim() || undefined,
      bcc: bcc.trim() || undefined,
      subject: subject.trim() || '(No Subject)',
      body,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0806] border border-[#8C6D4F]/40 rounded-sm w-full max-w-3xl shadow-2xl flex flex-col font-mono text-xs max-h-[90vh] animate-fadeIn">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[#8C6D4F]/30 bg-[#120F0C] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[#D4AF37] font-bold">✏️ NEW MESSAGE</span>
            <span className="text-[10px] text-[#8C6D4F]">(Gmail Service Client)</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C6D4F] hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
          
          {/* Recipient To */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#8C6D4F] uppercase font-bold">TO RECIPIENT *</label>
              {!showCcBcc && (
                <button
                  type="button"
                  onClick={() => setShowCcBcc(true)}
                  className="text-[10px] text-[#D4AF37] hover:underline"
                >
                  + CC / BCC
                </button>
              )}
            </div>
            <input
              type="email"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recruiter@company.com"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          {/* CC / BCC fields */}
          {showCcBcc && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              <div>
                <label className="block text-[#8C6D4F] uppercase mb-1">CC (CARBON COPY)</label>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-2.5 rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-[#8C6D4F] uppercase mb-1">BCC (BLIND CC)</label>
                <input
                  type="email"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="archive@company.com"
                  className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-2.5 rounded-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* Subject */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[#8C6D4F] uppercase">SUBJECT LINE *</label>
              
              {/* Quick Template Picker */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-[#8C6D4F]">QUICK TEMPLATE:</span>
                <select
                  onChange={(e) => {
                    const tpl = GmailService.getTemplates().find((t) => t.id === e.target.value);
                    if (tpl) {
                      if (tpl.subject) setSubject(tpl.subject);
                      setBody((prev) => (prev ? prev + '\n\n' + tpl.body : tpl.body));
                    }
                  }}
                  className="bg-[#120F0C] border border-[#8C6D4F]/30 text-[#D4AF37] text-[10px] p-1 rounded-sm outline-none font-bold"
                >
                  <option value="">-- Insert Template --</option>
                  {GmailService.getTemplates().map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Engineering Inquiry / Project Proposal..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          {/* Body Payload */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[#8C6D4F] uppercase">MESSAGE PAYLOAD (HTML / TEXT) *</label>

              {/* Append Signature */}
              <button
                type="button"
                onClick={() => {
                  const defaultSig = GmailService.getSignatures().find((s) => s.isDefault) || GmailService.getSignatures()[0];
                  if (defaultSig) {
                    setBody((prev) => prev + '\n\n' + defaultSig.contentHtml);
                  }
                }}
                className="text-[10px] text-[#D4AF37] hover:underline font-bold"
              >
                + INSERT SIGNATURE
              </button>
            </div>
            <textarea
              required
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email body..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none font-sans text-xs resize-none leading-relaxed"
            />
          </div>

          {/* Attachments */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#8C6D4F] uppercase font-bold">ATTACHMENTS</label>
              <label className="cursor-pointer text-[10px] text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-1 bg-[#120F0C] rounded-sm hover:bg-[#D4AF37] hover:text-black">
                + ATTACH FILE 📎
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="p-2 border border-[#8C6D4F]/40 bg-[#120F0C] rounded-sm flex items-center space-x-2 text-[11px]"
                  >
                    <span>📎</span>
                    <span className="text-white truncate max-w-[150px]">{att.filename}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="text-red-400 font-bold hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-[#8C6D4F]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold uppercase tracking-wider hover:bg-[#E2C054] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                SEND MAIL 🚀
              </button>

              <button
                type="button"
                onClick={handleDraftSubmit}
                className="px-4 py-2.5 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#D4AF37] font-bold uppercase hover:border-[#D4AF37]"
              >
                SAVE DRAFT 📝
              </button>

              {autosaveTime && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                  <span>✓</span>
                  <span>Autosaved at {autosaveTime}</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 uppercase font-bold self-end sm:self-auto"
            >
              DISCARD 🗑️
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
