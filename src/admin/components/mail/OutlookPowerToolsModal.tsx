import React, { useState } from 'react';
import { GmailService } from '../../../services/gmailService';
import type { OutlookRule, OutlookSignature, OutlookTemplate, OutlookAutoResponderConfig } from '../../../types/gmail';

interface OutlookPowerToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutlookPowerToolsModal: React.FC<OutlookPowerToolsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'signatures' | 'templates' | 'autoresponder'>('rules');

  // Rules state
  const [rules, setRules] = useState<OutlookRule[]>(() => GmailService.getRules());
  const [ruleName, setRuleName] = useState('');
  const [condition, setCondition] = useState<'from' | 'subject' | 'body'>('subject');
  const [matchStr, setMatchStr] = useState('');
  const [action, setAction] = useState<'category' | 'label' | 'star' | 'flag' | 'archive'>('category');
  const [targetVal, setTargetVal] = useState('Client Inquiry');

  // Signatures state
  const [signatures, setSignatures] = useState<OutlookSignature[]>(() => GmailService.getSignatures());
  const [sigName, setSigName] = useState('');
  const [sigHtml, setSigHtml] = useState('');

  // Templates state
  const [templates, setTemplates] = useState<OutlookTemplate[]>(() => GmailService.getTemplates());
  const [tplTitle, setTplTitle] = useState('');
  const [tplSubject, setTplSubject] = useState('');
  const [tplBody, setTplBody] = useState('');

  // AutoResponder state
  const [autoResp, setAutoResp] = useState<OutlookAutoResponderConfig>(() => GmailService.getAutoResponder());
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim() || !matchStr.trim()) return;
    const created = GmailService.addRule({
      name: ruleName.trim(),
      condition,
      match: matchStr.trim(),
      action,
      targetValue: targetVal.trim(),
      enabled: true,
    });
    setRules(GmailService.getRules());
    setRuleName('');
    setMatchStr('');
    setStatusMsg(`Rule "${created.name}" created!`);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleAddSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sigName.trim() || !sigHtml.trim()) return;
    GmailService.saveSignature({
      name: sigName.trim(),
      isDefault: signatures.length === 0,
      contentHtml: sigHtml.trim(),
    });
    setSignatures(GmailService.getSignatures());
    setSigName('');
    setSigHtml('');
    setStatusMsg('Signature saved!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tplTitle.trim() || !tplBody.trim()) return;
    GmailService.saveTemplate({
      title: tplTitle.trim(),
      subject: tplSubject.trim(),
      body: tplBody.trim(),
    });
    setTemplates(GmailService.getTemplates());
    setTplTitle('');
    setTplSubject('');
    setTplBody('');
    setStatusMsg('Quick response template saved!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleSaveAutoResponder = (e: React.FormEvent) => {
    e.preventDefault();
    GmailService.saveAutoResponder(autoResp);
    setStatusMsg('Auto-responder configuration saved!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs text-[#E8DFD8]">
      <div className="bg-[#0A0806] border border-[#8C6D4F]/40 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#8C6D4F]/30 bg-[#0F0C09] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase block">
              MAIL CENTER POWER TOOLS &amp; AUTOMATION
            </span>
            <h2
              className="text-2xl text-white uppercase tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              MAIL CENTER CONTROL CENTER
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm bg-[#120F0C] border border-[#8C6D4F]/30 text-[#8C6D4F] hover:text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-[#8C6D4F]/30 bg-[#0D0B08] overflow-x-auto">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-5 py-3 font-bold uppercase transition-colors shrink-0 ${
              activeTab === 'rules'
                ? 'bg-[#1E1914] text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-[#8C6D4F] hover:text-white'
            }`}
          >
            ⚡ INBOX RULES ({rules.length})
          </button>

          <button
            onClick={() => setActiveTab('signatures')}
            className={`px-5 py-3 font-bold uppercase transition-colors shrink-0 ${
              activeTab === 'signatures'
                ? 'bg-[#1E1914] text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-[#8C6D4F] hover:text-white'
            }`}
          >
            ✍️ HTML SIGNATURES ({signatures.length})
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-5 py-3 font-bold uppercase transition-colors shrink-0 ${
              activeTab === 'templates'
                ? 'bg-[#1E1914] text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-[#8C6D4F] hover:text-white'
            }`}
          >
            📋 QUICK TEMPLATES ({templates.length})
          </button>

          <button
            onClick={() => setActiveTab('autoresponder')}
            className={`px-5 py-3 font-bold uppercase transition-colors shrink-0 ${
              activeTab === 'autoresponder'
                ? 'bg-[#1E1914] text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-[#8C6D4F] hover:text-white'
            }`}
          >
            🤖 OUT OF OFFICE {autoResp.enabled ? '(ACTIVE)' : ''}
          </button>
        </div>

        {/* Status Toast Notification */}
        {statusMsg && (
          <div className="p-3 bg-emerald-950/40 border-b border-emerald-500/40 text-emerald-300 font-bold">
            ✓ {statusMsg}
          </div>
        )}

        {/* Tab Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: INBOX RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <form onSubmit={handleAddRule} className="bg-[#120F0C] border border-[#8C6D4F]/30 p-4 rounded-sm space-y-3">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase">CREATE NEW AUTOMATED INBOX RULE</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-[#8C6D4F] block mb-1">RULE NAME</label>
                    <input
                      type="text"
                      value={ruleName}
                      onChange={(e) => setRuleName(e.target.value)}
                      placeholder="e.g. Recruiter Auto-Flag"
                      className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8C6D4F] block mb-1">IF MESSAGE</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as any)}
                      className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none"
                    >
                      <option value="subject">Subject contains</option>
                      <option value="from">Sender contains</option>
                      <option value="body">Body text contains</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8C6D4F] block mb-1">MATCH STRING</label>
                    <input
                      type="text"
                      value={matchStr}
                      onChange={(e) => setMatchStr(e.target.value)}
                      placeholder="e.g. opportunity"
                      className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8C6D4F] block mb-1">THEN PERFORM ACTION</label>
                    <select
                      value={action}
                      onChange={(e) => setAction(e.target.value as any)}
                      className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none mb-2"
                    >
                      <option value="category">Assign Category</option>
                      <option value="flag">Flag for Follow-up</option>
                      <option value="star">Star Message</option>
                      <option value="archive">Archive Conversation</option>
                    </select>

                    <input
                      type="text"
                      value={targetVal}
                      onChange={(e) => setTargetVal(e.target.value)}
                      placeholder="Category / Target Value"
                      className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-1.5 text-white rounded-sm outline-none text-[11px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D4AF37] text-black font-bold uppercase rounded-sm hover:bg-[#E2C054]"
                  >
                    + ADD INBOX RULE
                  </button>
                </div>
              </form>

              {/* Active Rules List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#8C6D4F] uppercase">ACTIVE INBOX RULES</h3>
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-3 bg-[#0D0B08] border border-[#8C6D4F]/20 rounded-sm flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-white block">{rule.name}</span>
                      <span className="text-[11px] text-[#8C6D4F]">
                        If <code className="text-[#D4AF37]">{rule.condition}</code> contains &quot;{rule.match}&quot; → Action: {rule.action} ({rule.targetValue})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          GmailService.toggleRule(rule.id);
                          setRules(GmailService.getRules());
                        }}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-sm border ${
                          rule.enabled
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                            : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                        }`}
                      >
                        {rule.enabled ? 'ENABLED ✓' : 'DISABLED'}
                      </button>

                      <button
                        onClick={() => {
                          GmailService.deleteRule(rule.id);
                          setRules(GmailService.getRules());
                        }}
                        className="px-2.5 py-1 text-[10px] bg-red-950/40 border border-red-500/40 text-red-300 rounded-sm font-bold hover:bg-red-900/50"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SIGNATURES */}
          {activeTab === 'signatures' && (
            <div className="space-y-6">
              <form onSubmit={handleAddSignature} className="bg-[#120F0C] border border-[#8C6D4F]/30 p-4 rounded-sm space-y-3">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase">CREATE NEW HTML EMAIL SIGNATURE</h3>
                <div>
                  <label className="text-[10px] text-[#8C6D4F] block mb-1">SIGNATURE NAME</label>
                  <input
                    type="text"
                    value={sigName}
                    onChange={(e) => setSigName(e.target.value)}
                    placeholder="e.g. Official Portfolio Signature"
                    className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#8C6D4F] block mb-1">HTML SIGNATURE CONTENT</label>
                  <textarea
                    rows={4}
                    value={sigHtml}
                    onChange={(e) => setSigHtml(e.target.value)}
                    placeholder="<p><strong>Tarun Kumar</strong><br>Senior Architect...</p>"
                    className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none font-mono text-xs"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D4AF37] text-black font-bold uppercase rounded-sm hover:bg-[#E2C054]"
                  >
                    + SAVE SIGNATURE
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#8C6D4F] uppercase">SAVED SIGNATURES</h3>
                {signatures.map((sig) => (
                  <div key={sig.id} className="p-4 bg-[#0D0B08] border border-[#8C6D4F]/20 rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{sig.name}</span>
                      <button
                        onClick={() => {
                          GmailService.deleteSignature(sig.id);
                          setSignatures(GmailService.getSignatures());
                        }}
                        className="text-[10px] text-red-400 font-bold hover:underline"
                      >
                        DELETE
                      </button>
                    </div>
                    <div
                      className="p-3 bg-white text-black rounded-sm text-xs"
                      dangerouslySetInnerHTML={{ __html: sig.contentHtml }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <form onSubmit={handleAddTemplate} className="bg-[#120F0C] border border-[#8C6D4F]/30 p-4 rounded-sm space-y-3">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase">CREATE QUICK RESPONSE TEMPLATE</h3>
                <div>
                  <label className="text-[10px] text-[#8C6D4F] block mb-1">TEMPLATE TITLE</label>
                  <input
                    type="text"
                    value={tplTitle}
                    onChange={(e) => setTplTitle(e.target.value)}
                    placeholder="e.g. Rates & Availability"
                    className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#8C6D4F] block mb-1">DEFAULT SUBJECT</label>
                  <input
                    type="text"
                    value={tplSubject}
                    onChange={(e) => setTplSubject(e.target.value)}
                    placeholder="e.g. Re: Portfolio Consulting Inquiry"
                    className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#8C6D4F] block mb-1">TEMPLATE BODY</label>
                  <textarea
                    rows={4}
                    value={tplBody}
                    onChange={(e) => setTplBody(e.target.value)}
                    placeholder="Hi,\n\nThank you for your message..."
                    className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2 text-white rounded-sm outline-none font-mono text-xs"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D4AF37] text-black font-bold uppercase rounded-sm hover:bg-[#E2C054]"
                  >
                    + SAVE TEMPLATE
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#8C6D4F] uppercase">SAVED QUICK TEMPLATES</h3>
                {templates.map((tpl) => (
                  <div key={tpl.id} className="p-4 bg-[#0D0B08] border border-[#8C6D4F]/20 rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#D4AF37]">{tpl.title}</span>
                      <button
                        onClick={() => {
                          GmailService.deleteTemplate(tpl.id);
                          setTemplates(GmailService.getTemplates());
                        }}
                        className="text-[10px] text-red-400 font-bold hover:underline"
                      >
                        DELETE
                      </button>
                    </div>
                    <p className="text-xs text-[#E8DFD8] whitespace-pre-wrap">{tpl.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OUT OF OFFICE */}
          {activeTab === 'autoresponder' && (
            <form onSubmit={handleSaveAutoResponder} className="bg-[#120F0C] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase">OUT-OF-OFFICE AUTO-RESPONDER</h3>
              
              <div className="flex items-center space-x-3 p-3 bg-[#0A0806] border border-[#8C6D4F]/20 rounded-sm">
                <input
                  type="checkbox"
                  id="auto_resp_enable"
                  checked={autoResp.enabled}
                  onChange={(e) => setAutoResp({ ...autoResp, enabled: e.target.checked })}
                  className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
                <label htmlFor="auto_resp_enable" className="font-bold text-white cursor-pointer select-none">
                  ENABLE AUTOMATIC OUT-OF-OFFICE REPLIES TO PORTFOLIO INQUIRIES
                </label>
              </div>

              <div>
                <label className="text-[10px] text-[#8C6D4F] block mb-1">AUTO-RESPONSE SUBJECT LINE</label>
                <input
                  type="text"
                  value={autoResp.subject}
                  onChange={(e) => setAutoResp({ ...autoResp, subject: e.target.value })}
                  className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2.5 text-white rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8C6D4F] block mb-1">AUTO-RESPONSE BODY MESSAGE</label>
                <textarea
                  rows={5}
                  value={autoResp.message}
                  onChange={(e) => setAutoResp({ ...autoResp, message: e.target.value })}
                  className="w-full bg-[#0A0806] border border-[#8C6D4F]/30 p-2.5 text-white rounded-sm outline-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold uppercase rounded-sm hover:bg-[#E2C054]"
                >
                  SAVE OUT-OF-OFFICE CONFIGURATION
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
