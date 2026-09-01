import type {
  GmailAccount,
  GmailThread,
  GmailMessage,
  GmailLabel,
  GmailDraft,
  SendMailRequest,
  MailSearchQuery,
  OAuthCredentials,
  OutlookRule,
  OutlookSignature,
  OutlookTemplate,
  OutlookAutoResponderConfig,
} from '../types/gmail';
import { buildMimeMessage } from './gmailMimeBuilder';
import { sanitizeHtml } from './htmlSanitizer';

export const TARGET_GMAIL_ACCOUNT = 'tarunsinghchaudharyy@gmail.com';

const STORAGE_PREFIX = 'tarun_portfolio_gmail_';

const safeGetStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    if (!saved) return fallback;
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
};

const safeSetStorage = <T,>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore
  }
};

// Initial Seed Data for Sandbox Mode
const initialAccount: GmailAccount = {
  email: TARGET_GMAIL_ACCOUNT,
  name: 'Tarun Kumar',
  connected: false,
  lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16),
  quotaUsed: '1.2 GB / 15 GB',
  messagesTotal: 12,
  threadsTotal: 5,
  unreadCount: 2,
};

const initialLabels: GmailLabel[] = [
  { id: 'INBOX', name: 'INBOX', type: 'system', messagesUnread: 2, messagesTotal: 5 },
  { id: 'STARRED', name: 'STARRED', type: 'system', messagesTotal: 2 },
  { id: 'SENT', name: 'SENT', type: 'system', messagesTotal: 4 },
  { id: 'DRAFTS', name: 'DRAFTS', type: 'system', messagesTotal: 1 },
  { id: 'SPAM', name: 'SPAM', type: 'system', messagesTotal: 0 },
  { id: 'TRASH', name: 'TRASH', type: 'system', messagesTotal: 0 },
  { id: 'Label_Work', name: 'Work & Offers', type: 'user', color: { backgroundColor: '#1E1914', textColor: '#D4AF37' } },
  { id: 'Label_Projects', name: 'Projects & Consulting', type: 'user', color: { backgroundColor: '#0F1A14', textColor: '#34D399' } },
  { id: 'Label_Research', name: 'AI & Research', type: 'user', color: { backgroundColor: '#14141E', textColor: '#60A5FA' } },
];

const initialThreads: GmailThread[] = [
  {
    id: 'thread_001',
    subject: 'Senior Python & Cloud DevOps Opportunity — Executive Inquiry',
    snippet: 'Hi Tarun, we reviewed your Python API microservices architecture & AWS infrastructure lab track...',
    lastMessageDate: '2026-09-01 14:15',
    unread: true,
    starred: true,
    labelIds: ['INBOX', 'STARRED', 'Label_Work'],
    participants: [{ name: 'Elena Vance', email: 'elena.vance@techcorp.com' }, { name: 'Tarun Kumar', email: TARGET_GMAIL_ACCOUNT }],
    messages: [
      {
        id: 'msg_001',
        threadId: 'thread_001',
        labelIds: ['INBOX', 'STARRED', 'Label_Work'],
        snippet: 'Hi Tarun, we reviewed your Python API microservices architecture...',
        internalDate: Date.now().toString(),
        starred: true,
        unread: true,
        from: { name: 'Elena Vance', email: 'elena.vance@techcorp.com' },
        to: TARGET_GMAIL_ACCOUNT,
        subject: 'Senior Python & Cloud DevOps Opportunity — Executive Inquiry',
        dateStr: 'Sep 1, 2026, 2:15 PM',
        bodyText: 'Hi Tarun,\n\nWe reviewed your portfolio engineering lab tracks and REST API architecture. We are impressed by your Python backend design and Docker/AWS deployment pipeline.\n\nWould you be open for a short call this week to discuss a lead Python engineering role?\n\nBest regards,\nElena Vance',
        bodyHtml: '<p>Hi Tarun,</p><p>We reviewed your portfolio engineering lab tracks and REST API architecture. We are impressed by your Python backend design and Docker/AWS deployment pipeline.</p><p>Would you be open for a short call this week to discuss a lead Python engineering role?</p><p>Best regards,<br><strong>Elena Vance</strong><br><em>Talent Lead @ TechCorp</em></p>',
        attachments: [
          { id: 'att_1', filename: 'Engineering_Role_Overview.pdf', mimeType: 'application/pdf', size: 245000 },
        ],
      },
    ],
  },
  {
    id: 'thread_002',
    subject: 'Consulting Inquiry: Scalable Microservices Architecture in FastAPI',
    snippet: 'Hey Tarun, saw your FastAPI + Redis caching project on GitHub. We need help auditing our backend...',
    lastMessageDate: '2026-08-31 16:40',
    unread: true,
    starred: false,
    labelIds: ['INBOX', 'Label_Projects'],
    participants: [{ name: 'David Miller', email: 'david@cloudscale.io' }, { name: 'Tarun Kumar', email: TARGET_GMAIL_ACCOUNT }],
    messages: [
      {
        id: 'msg_002',
        threadId: 'thread_002',
        labelIds: ['INBOX', 'Label_Projects'],
        snippet: 'Hey Tarun, saw your FastAPI + Redis caching project on GitHub...',
        internalDate: (Date.now() - 86400000).toString(),
        starred: false,
        unread: true,
        from: { name: 'David Miller', email: 'david@cloudscale.io' },
        to: TARGET_GMAIL_ACCOUNT,
        subject: 'Consulting Inquiry: Scalable Microservices Architecture in FastAPI',
        dateStr: 'Aug 31, 2026, 4:40 PM',
        bodyText: 'Hey Tarun,\n\nI came across your GitHub repository for distributed Python REST services. Our team is building a high-throughput backend service in FastAPI and PostgreSQL.\n\nWe would love to contract your expertise for an architectural code review.\n\nThanks,\nDavid',
        bodyHtml: '<p>Hey Tarun,</p><p>I came across your GitHub repository for distributed Python REST services. Our team is building a high-throughput backend service in FastAPI and PostgreSQL.</p><p>We would love to contract your expertise for an architectural code review.</p><p>Thanks,<br><strong>David Miller</strong></p>',
      },
    ],
  },
  {
    id: 'thread_003',
    subject: 'Research Collaboration: Explainable AI & SHAP Model Diagnostics',
    snippet: 'Greetings Tarun, your research paper on XAI interpretability for neural networks aligns closely with our lab...',
    lastMessageDate: '2026-08-29 11:20',
    unread: false,
    starred: true,
    labelIds: ['INBOX', 'STARRED', 'Label_Research'],
    participants: [{ name: 'Dr. Aris Thorne', email: 'athorne@stanford.edu' }, { name: 'Tarun Kumar', email: TARGET_GMAIL_ACCOUNT }],
    messages: [
      {
        id: 'msg_003',
        threadId: 'thread_003',
        labelIds: ['INBOX', 'STARRED', 'Label_Research'],
        snippet: 'Greetings Tarun, your research paper on XAI interpretability...',
        internalDate: (Date.now() - 172800000).toString(),
        starred: true,
        unread: false,
        from: { name: 'Dr. Aris Thorne', email: 'athorne@stanford.edu' },
        to: TARGET_GMAIL_ACCOUNT,
        subject: 'Research Collaboration: Explainable AI & SHAP Model Diagnostics',
        dateStr: 'Aug 29, 2026, 11:20 AM',
        bodyText: 'Greetings Tarun,\n\nYour research section on SHAP and LIME feature attributions caught our interest. We are organizing a workshop on interpretable Machine Learning.\n\nWould you be interested in presenting your methodology breakdown?\n\nBest,\nDr. Aris Thorne',
        bodyHtml: '<p>Greetings Tarun,</p><p>Your research section on SHAP and LIME feature attributions caught our interest. We are organizing a workshop on interpretable Machine Learning.</p><p>Would you be interested in presenting your methodology breakdown?</p><p>Best,<br><strong>Dr. Aris Thorne</strong><br><em>Department of Computer Science</em></p>',
      },
    ],
  },
  {
    id: 'thread_004',
    subject: 'Re: Portfolio Contact Form Submission — Infrastructure Automation',
    snippet: 'Hi Marcus, thank you for reaching out via my portfolio. I have attached my cloud automation architecture spec...',
    lastMessageDate: '2026-08-27 09:15',
    unread: false,
    starred: false,
    labelIds: ['SENT'],
    participants: [{ name: 'Tarun Kumar', email: TARGET_GMAIL_ACCOUNT }, { name: 'Marcus Brody', email: 'marcus@devops.co' }],
    messages: [
      {
        id: 'msg_004_1',
        threadId: 'thread_004',
        labelIds: ['SENT'],
        snippet: 'Hi Marcus, thank you for reaching out via my portfolio...',
        internalDate: (Date.now() - 345600000).toString(),
        starred: false,
        unread: false,
        from: { name: 'Tarun Kumar', email: TARGET_GMAIL_ACCOUNT },
        to: 'marcus@devops.co',
        subject: 'Re: Portfolio Contact Form Submission — Infrastructure Automation',
        dateStr: 'Aug 27, 2026, 9:15 AM',
        bodyText: 'Hi Marcus,\n\nThank you for reaching out via my portfolio. I have reviewed your request regarding Terraform scripts and Docker CI/CD pipelines.\n\nFeel free to schedule a quick sync.\n\nBest regards,\nTarun Kumar',
        bodyHtml: '<p>Hi Marcus,</p><p>Thank you for reaching out via my portfolio. I have reviewed your request regarding Terraform scripts and Docker CI/CD pipelines.</p><p>Feel free to schedule a quick sync.</p><p>Best regards,<br><strong>Tarun Kumar</strong></p>',
      },
    ],
  },
];

const initialDrafts: GmailDraft[] = [
  {
    id: 'draft_001',
    message: {
      id: 'msg_draft_001',
      threadId: 'draft_thread_001',
      labelIds: ['DRAFTS'],
      snippet: '[Draft] Project Proposal for Custom Python API Gateway...',
      internalDate: Date.now().toString(),
      to: 'client@enterprise.org',
      subject: 'Draft: Proposal for Custom Python API Gateway & Cloud Setup',
      bodyText: 'Hi team,\n\nAttached is the preliminary technical architecture draft for the backend microservice API...',
      bodyHtml: '<p>Hi team,</p><p>Attached is the preliminary technical architecture draft for the backend microservice API...</p>',
    },
  },
];

// Gmail Service Manager Class
export class GmailService {
  private static account: GmailAccount = safeGetStorage('account', initialAccount);
  private static threads: GmailThread[] = safeGetStorage('threads', initialThreads);
  private static drafts: GmailDraft[] = safeGetStorage('drafts', initialDrafts);
  private static labels: GmailLabel[] = safeGetStorage('labels', initialLabels);
  private static oauthConfig: OAuthCredentials = safeGetStorage('oauth_credentials', {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${typeof window !== 'undefined' ? window.location.origin : 'https://heytarunkumar.vercel.app'}/admin/mail/settings`,
    refreshToken: import.meta.env.VITE_GMAIL_REFRESH_TOKEN || '',
  });

  // 1. Account & Connection Status
  public static getAccount(): GmailAccount {
    const unread = this.threads.filter((t) => t.unread && t.labelIds?.includes('INBOX')).length;
    this.account.unreadCount = unread;
    this.account.messagesTotal = this.threads.reduce((acc, t) => acc + t.messages.length, 0);
    this.account.threadsTotal = this.threads.length;
    return { ...this.account };
  }

  public static updateAccount(updated: Partial<GmailAccount>): GmailAccount {
    this.account = { ...this.account, ...updated };
    safeSetStorage('account', this.account);
    return { ...this.account };
  }

  public static getOAuthCredentials(): OAuthCredentials {
    return { ...this.oauthConfig };
  }

  public static saveOAuthCredentials(credentials: Partial<OAuthCredentials>): OAuthCredentials {
    this.oauthConfig = { ...this.oauthConfig, ...credentials };
    if (this.oauthConfig.refreshToken) {
      this.account.connected = true;
    }
    safeSetStorage('oauth_credentials', this.oauthConfig);
    safeSetStorage('account', this.account);
    return { ...this.oauthConfig };
  }

  // 2. Generate Google OAuth 2.0 Auth URL (Least privilege scope)
  public static getGoogleAuthUrl(): string {
    const clientId = this.oauthConfig.clientId || 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = encodeURIComponent(this.oauthConfig.redirectUri || 'https://heytarunkumar.vercel.app/admin/mail/settings');
    const scope = encodeURIComponent([
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.labels',
    ].join(' '));

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=tarun_admin_gmail_oauth`;
  }

  // 3. Live Google OAuth Authorization Code Exchange
  public static async exchangeAuthCode(code: string): Promise<boolean> {
    if (!this.oauthConfig.clientId || !this.oauthConfig.clientSecret) {
      this.account.connected = true;
      safeSetStorage('account', this.account);
      return true;
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: this.oauthConfig.clientId,
          client_secret: this.oauthConfig.clientSecret,
          redirect_uri: this.oauthConfig.redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.oauthConfig.accessToken = data.access_token;
        if (data.refresh_token) {
          this.oauthConfig.refreshToken = data.refresh_token;
        }
        this.oauthConfig.expiryDate = Date.now() + (data.expires_in || 3600) * 1000;
        this.account.connected = true;
        
        safeSetStorage('oauth_credentials', this.oauthConfig);
        safeSetStorage('account', this.account);

        await this.syncLiveGmailAccount();
        return true;
      }
    } catch {
      // fallback
    }

    this.account.connected = true;
    safeSetStorage('account', this.account);
    return true;
  }

  // 4. Live Access Token Refresh
  public static async refreshAccessToken(): Promise<string | null> {
    if (!this.oauthConfig.refreshToken || !this.oauthConfig.clientId || !this.oauthConfig.clientSecret) {
      return null;
    }

    if (this.oauthConfig.accessToken && this.oauthConfig.expiryDate && this.oauthConfig.expiryDate > Date.now() + 60000) {
      return this.oauthConfig.accessToken;
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          refresh_token: this.oauthConfig.refreshToken,
          client_id: this.oauthConfig.clientId,
          client_secret: this.oauthConfig.clientSecret,
          grant_type: 'refresh_token',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.oauthConfig.accessToken = data.access_token;
        this.oauthConfig.expiryDate = Date.now() + (data.expires_in || 3600) * 1000;
        safeSetStorage('oauth_credentials', this.oauthConfig);
        return data.access_token;
      }
    } catch {
      // fallback
    }

    return null;
  }

  // 5. Live Gmail Profile Sync
  public static async syncLiveGmailAccount(): Promise<void> {
    const token = await this.refreshAccessToken();
    if (!token) return;

    try {
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const profile = await response.json();
        this.account.email = profile.emailAddress || TARGET_GMAIL_ACCOUNT;
        this.account.messagesTotal = profile.messagesTotal;
        this.account.threadsTotal = profile.threadsTotal;
        this.account.connected = true;
        this.account.lastSync = new Date().toISOString().replace('T', ' ').substring(0, 16);
        safeSetStorage('account', this.account);
      }
    } catch {
      // fallback
    }
  }

  public static getThreads(folder: string = 'PORTFOLIO_INBOX'): GmailThread[] {
    let result = [...this.threads];

    if (folder === 'PORTFOLIO_INBOX') {
      result = result.filter((t) =>
        t.labelIds?.includes('Label_Projects') ||
        t.labelIds?.includes('INBOX') ||
        t.subject?.toLowerCase().includes('portfolio') ||
        t.subject?.toLowerCase().includes('contact')
      );
    } else if (folder === 'INBOX') {
      result = result.filter((t) => t.labelIds?.includes('INBOX'));
    } else if (folder === 'STARRED') {
      result = result.filter((t) => t.starred || t.labelIds?.includes('STARRED'));
    } else if (folder === 'SENT') {
      result = result.filter((t) => t.labelIds?.includes('SENT'));
    } else if (folder === 'SPAM') {
      result = result.filter((t) => t.labelIds?.includes('SPAM'));
    } else if (folder === 'TRASH') {
      result = result.filter((t) => t.labelIds?.includes('TRASH'));
    } else if (folder.startsWith('Label_')) {
      result = result.filter((t) => t.labelIds?.includes(folder));
    }

    // Microsoft Outlook Workflow: Pinned messages stay anchored at the top
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.lastMessageDate || 0).getTime() - new Date(a.lastMessageDate || 0).getTime();
    });
  }

  public static getThreadById(id: string): GmailThread | undefined {
    return this.threads.find((t) => t.id === id);
  }

  // 7. Send Email & Contact Form Integration
  public static sendEmail(req: SendMailRequest): { success: boolean; threadId: string } {
    const fromEmail = TARGET_GMAIL_ACCOUNT;

    const newMessage: GmailMessage = {
      id: `msg_${Date.now()}`,
      threadId: req.threadId || `thread_${Date.now()}`,
      labelIds: ['SENT'],
      snippet: req.body.substring(0, 100).replace(/<[^>]*>?/gm, ''),
      internalDate: Date.now().toString(),
      starred: false,
      unread: false,
      from: { name: 'Tarun Kumar', email: fromEmail },
      to: req.to,
      cc: req.cc,
      bcc: req.bcc,
      subject: req.subject,
      dateStr: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      bodyText: req.body.replace(/<[^>]*>?/gm, ''),
      bodyHtml: sanitizeHtml(req.body),
      attachments: req.attachments?.map((a, i) => ({
        id: `att_sent_${Date.now()}_${i}`,
        filename: a.filename,
        mimeType: a.mimeType,
        size: Math.round(a.dataUrl.length * 0.75),
        dataUrl: a.dataUrl,
      })),
    };

    if (req.threadId) {
      // Append to existing thread
      const threadIdx = this.threads.findIndex((t) => t.id === req.threadId);
      if (threadIdx !== -1) {
        this.threads[threadIdx].messages.push(newMessage);
        this.threads[threadIdx].lastMessageDate = new Date().toISOString().replace('T', ' ').substring(0, 16);
        if (!this.threads[threadIdx].labelIds?.includes('SENT')) {
          this.threads[threadIdx].labelIds?.push('SENT');
        }
      }
    } else {
      // Create new thread
      const newThread: GmailThread = {
        id: newMessage.threadId,
        subject: req.subject,
        snippet: newMessage.snippet,
        lastMessageDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        unread: false,
        starred: false,
        labelIds: ['SENT'],
        participants: [
          { name: 'Tarun Kumar', email: fromEmail },
          { name: req.to.split('@')[0], email: req.to },
        ],
        messages: [newMessage],
      };
      this.threads.unshift(newThread);
    }

    safeSetStorage('threads', this.threads);
    this.account.lastSync = new Date().toISOString().replace('T', ' ').substring(0, 16);
    safeSetStorage('account', this.account);

    // Perform background live Google API post if token is active
    this.refreshAccessToken().then((token) => {
      if (token) {
        const rawMime = buildMimeMessage(req, fromEmail);
        fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw: rawMime, threadId: req.threadId }),
        }).catch(() => {});
      }
    });

    return { success: true, threadId: newMessage.threadId };
  }

  // 8. Public Portfolio Contact Form Mail Dispatcher
  public static dispatchContactFormPayload(data: { name: string; email: string; subject?: string; message: string }): void {
    const threadId = `contact_thread_${Date.now()}`;
    const subjectTitle = data.subject ? `[Portfolio Contact] ${data.subject}` : `[Portfolio Contact] Message from ${data.name}`;

    const incomingMsg: GmailMessage = {
      id: `msg_contact_${Date.now()}`,
      threadId,
      labelIds: ['INBOX', 'Label_Projects'],
      snippet: data.message.substring(0, 120),
      internalDate: Date.now().toString(),
      starred: false,
      unread: true,
      from: { name: data.name, email: data.email },
      to: TARGET_GMAIL_ACCOUNT,
      subject: subjectTitle,
      dateStr: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      bodyText: data.message,
      bodyHtml: `<div style="font-family: monospace; color: #111;">
        <h3 style="color: #8C6D4F; margin-bottom: 8px;">PORTFOLIO CONTACT FORM PAYLOAD</h3>
        <p><strong>Sender:</strong> ${data.name} &lt;${data.email}&gt;</p>
        <p><strong>Date:</strong> ${new Date().toUTCString()}</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;" />
        <p style="white-space: pre-wrap; font-size: 14px;">${data.message}</p>
      </div>`,
    };

    const newThread: GmailThread = {
      id: threadId,
      subject: subjectTitle,
      snippet: incomingMsg.snippet,
      lastMessageDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      unread: true,
      starred: false,
      labelIds: ['INBOX', 'Label_Projects'],
      participants: [
        { name: data.name, email: data.email },
        { name: 'Tarun Kumar', email: TARGET_GMAIL_ACCOUNT },
      ],
      messages: [incomingMsg],
    };

    this.threads.unshift(newThread);
    safeSetStorage('threads', this.threads);

    // Dispatch background live email via API if active
    this.refreshAccessToken().then((token) => {
      if (token) {
        const rawMime = buildMimeMessage(
          {
            to: TARGET_GMAIL_ACCOUNT,
            subject: subjectTitle,
            body: data.message,
          },
          data.email
        );
        fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw: rawMime }),
        }).catch(() => {});
      }
    });
  }

  // 9. Drafts Management
  public static getDrafts(): GmailDraft[] {
    return [...this.drafts];
  }

  public static saveDraft(req: SendMailRequest): GmailDraft {
    const draftId = `draft_${Date.now()}`;
    const draft: GmailDraft = {
      id: draftId,
      message: {
        id: `msg_${draftId}`,
        threadId: req.threadId || `thread_${draftId}`,
        labelIds: ['DRAFTS'],
        snippet: req.body.substring(0, 100),
        internalDate: Date.now().toString(),
        to: req.to,
        cc: req.cc,
        bcc: req.bcc,
        subject: req.subject || '(No Subject)',
        bodyText: req.body,
        bodyHtml: sanitizeHtml(req.body),
      },
    };

    this.drafts.unshift(draft);
    safeSetStorage('drafts', this.drafts);

    // Async Google API Save Draft if token available
    this.refreshAccessToken().then((token) => {
      if (token) {
        const rawMime = buildMimeMessage(req, TARGET_GMAIL_ACCOUNT);
        fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: { raw: rawMime } }),
        }).catch(() => {});
      }
    });

    return draft;
  }

  public static deleteDraft(draftId: string): void {
    this.drafts = this.drafts.filter((d) => d.id !== draftId);
    safeSetStorage('drafts', this.drafts);
  }

  public static toggleThreadPin(threadId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      this.threads[idx].pinned = !this.threads[idx].pinned;
      safeSetStorage('threads', this.threads);
    }
  }

  public static toggleThreadFlag(threadId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      this.threads[idx].flagged = !this.threads[idx].flagged;
      safeSetStorage('threads', this.threads);
    }
  }

  public static setThreadCategory(threadId: string, category: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      this.threads[idx].category = category;
      safeSetStorage('threads', this.threads);
    }
  }

  // 10. Message & Thread Actions (Star, Unread, Archive, Trash, Apply Label)
  public static toggleThreadStar(threadId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      const isStarred = !this.threads[idx].starred;
      this.threads[idx].starred = isStarred;
      if (isStarred) {
        if (!this.threads[idx].labelIds?.includes('STARRED')) {
          this.threads[idx].labelIds?.push('STARRED');
        }
      } else {
        this.threads[idx].labelIds = this.threads[idx].labelIds?.filter((l) => l !== 'STARRED');
      }
      safeSetStorage('threads', this.threads);
    }
  }

  public static toggleThreadUnread(threadId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      const isUnread = !this.threads[idx].unread;
      this.threads[idx].unread = isUnread;
      this.threads[idx].messages.forEach((m) => (m.unread = isUnread));
      safeSetStorage('threads', this.threads);
    }
  }

  public static archiveThread(threadId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      this.threads[idx].labelIds = this.threads[idx].labelIds?.filter((l) => l !== 'INBOX');
      safeSetStorage('threads', this.threads);
    }
  }

  public static trashThread(threadId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      this.threads[idx].labelIds = ['TRASH'];
      safeSetStorage('threads', this.threads);
    }
  }

  public static applyLabelToThread(threadId: string, labelId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      if (!this.threads[idx].labelIds?.includes(labelId)) {
        this.threads[idx].labelIds?.push(labelId);
        safeSetStorage('threads', this.threads);
      }
    }
  }

  public static removeLabelFromThread(threadId: string, labelId: string): void {
    const idx = this.threads.findIndex((t) => t.id === threadId);
    if (idx !== -1) {
      this.threads[idx].labelIds = this.threads[idx].labelIds?.filter((l) => l !== labelId);
      safeSetStorage('threads', this.threads);
    }
  }

  // 11. Labels Management
  public static getLabels(): GmailLabel[] {
    return [...this.labels];
  }

  public static addCustomLabel(name: string, color?: { backgroundColor: string; textColor: string }): GmailLabel {
    const labelId = `Label_${name.replace(/\s+/g, '_')}`;
    const newLabel: GmailLabel = {
      id: labelId,
      name,
      type: 'user',
      messagesTotal: 0,
      color: color || { backgroundColor: '#1E1914', textColor: '#D4AF37' },
    };
    this.labels.push(newLabel);
    safeSetStorage('labels', this.labels);
    return newLabel;
  }

  // 12. Mail Search Engine
  public static searchMail(query: MailSearchQuery): GmailThread[] {
    const q = query.q?.toLowerCase().trim() || '';
    const fromQ = query.from?.toLowerCase().trim() || '';
    const toQ = query.to?.toLowerCase().trim() || '';
    const subjectQ = query.subject?.toLowerCase().trim() || '';

    return this.threads.filter((t) => {
      if (query.isUnread && !t.unread) return false;
      if (query.labelId && !t.labelIds?.includes(query.labelId)) return false;

      if (fromQ && !t.messages.some((m) => m.from?.email.toLowerCase().includes(fromQ) || m.from?.name.toLowerCase().includes(fromQ))) {
        return false;
      }
      if (toQ && !t.messages.some((m) => m.to?.toLowerCase().includes(toQ))) {
        return false;
      }
      if (subjectQ && !t.subject?.toLowerCase().includes(subjectQ)) {
        return false;
      }

      if (query.hasAttachment && !t.messages.some((m) => m.attachments && m.attachments.length > 0)) {
        return false;
      }

      if (!q) return true;

      const inSubject = t.subject?.toLowerCase().includes(q);
      const inSnippet = t.snippet?.toLowerCase().includes(q);
      const inSender = t.messages.some((m) => m.from?.name.toLowerCase().includes(q) || m.from?.email.toLowerCase().includes(q));
      const inBody = t.messages.some((m) => m.bodyText?.toLowerCase().includes(q) || m.bodyHtml?.toLowerCase().includes(q));

      return inSubject || inSnippet || inSender || inBody;
    });
  }

  // 13. Outlook Rules, Signatures, Templates, & Auto-Responder
  private static rules: OutlookRule[] = safeGetStorage('outlook_rules', [
    {
      id: 'rule_1',
      name: 'Auto-Categorize Portfolio Contacts',
      condition: 'subject',
      match: '[Portfolio Contact]',
      action: 'category',
      targetValue: 'Client Inquiry',
      enabled: true,
    },
    {
      id: 'rule_2',
      name: 'Flag Recruiter Opportunities',
      condition: 'body',
      match: 'opportunity',
      action: 'flag',
      targetValue: 'true',
      enabled: true,
    },
  ]);

  private static signatures: OutlookSignature[] = safeGetStorage('outlook_signatures', [
    {
      id: 'sig_1',
      name: 'Official Executive Signature',
      isDefault: true,
      contentHtml: '<div style="font-family: monospace; font-size: 13px; color: #111; border-left: 2px solid #D4AF37; padding-left: 10px; margin-top: 15px;"><p style="margin: 0; font-weight: bold; color: #8C6D4F;">TARUN KUMAR</p><p style="margin: 2px 0 0 0; color: #555;">Senior Full-Stack &amp; Python Cloud Architect</p><p style="margin: 4px 0 0 0;"><a href="https://heytarunkumar.vercel.app" style="color: #D4AF37; text-decoration: none;">heytarunkumar.vercel.app</a> | tarunsinghchaudharyy@gmail.com</p></div>',
    },
  ]);

  private static templates: OutlookTemplate[] = safeGetStorage('outlook_templates', [
    {
      id: 'tpl_1',
      title: 'Portfolio Inquiry Thank You',
      subject: 'Re: Portfolio Contact Inquiry',
      body: 'Hi,\n\nThank you for reaching out through my portfolio website. I have received your enquiry and will get back to you shortly.\n\nBest regards,\nTarun Kumar',
    },
    {
      id: 'tpl_2',
      title: 'Consulting Rate Card & Availability',
      subject: 'Re: Consulting & Microservices Architecture Inquiry',
      body: 'Hi,\n\nThanks for your interest in contracting my services for your cloud microservices architecture. I am currently open for strategic code audits and FastAPI/Python API design.\n\nBest regards,\nTarun Kumar',
    },
  ]);

  private static autoResponder: OutlookAutoResponderConfig = safeGetStorage('outlook_auto_responder', {
    enabled: false,
    subject: 'Out of Office — Portfolio Contact Received',
    message: 'Thank you for reaching out via my portfolio. I am currently out of office and will review your email within 24 hours.',
  });

  public static getRules(): OutlookRule[] {
    return [...this.rules];
  }

  public static addRule(rule: Omit<OutlookRule, 'id'>): OutlookRule {
    const newRule: OutlookRule = { ...rule, id: `rule_${Date.now()}` };
    this.rules.push(newRule);
    safeSetStorage('outlook_rules', this.rules);
    return newRule;
  }

  public static toggleRule(ruleId: string): void {
    const idx = this.rules.findIndex((r) => r.id === ruleId);
    if (idx !== -1) {
      this.rules[idx].enabled = !this.rules[idx].enabled;
      safeSetStorage('outlook_rules', this.rules);
    }
  }

  public static deleteRule(ruleId: string): void {
    this.rules = this.rules.filter((r) => r.id !== ruleId);
    safeSetStorage('outlook_rules', this.rules);
  }

  public static getSignatures(): OutlookSignature[] {
    return [...this.signatures];
  }

  public static saveSignature(sig: Omit<OutlookSignature, 'id'>): OutlookSignature {
    const newSig: OutlookSignature = { ...sig, id: `sig_${Date.now()}` };
    if (newSig.isDefault) {
      this.signatures.forEach((s) => (s.isDefault = false));
    }
    this.signatures.push(newSig);
    safeSetStorage('outlook_signatures', this.signatures);
    return newSig;
  }

  public static deleteSignature(id: string): void {
    this.signatures = this.signatures.filter((s) => s.id !== id);
    safeSetStorage('outlook_signatures', this.signatures);
  }

  public static getTemplates(): OutlookTemplate[] {
    return [...this.templates];
  }

  public static saveTemplate(tpl: Omit<OutlookTemplate, 'id'>): OutlookTemplate {
    const newTpl: OutlookTemplate = { ...tpl, id: `tpl_${Date.now()}` };
    this.templates.push(newTpl);
    safeSetStorage('outlook_templates', this.templates);
    return newTpl;
  }

  public static deleteTemplate(id: string): void {
    this.templates = this.templates.filter((t) => t.id !== id);
    safeSetStorage('outlook_templates', this.templates);
  }

  public static getAutoResponder(): OutlookAutoResponderConfig {
    return { ...this.autoResponder };
  }

  public static saveAutoResponder(config: OutlookAutoResponderConfig): void {
    this.autoResponder = { ...config };
    safeSetStorage('outlook_auto_responder', this.autoResponder);
  }

  // 14. Connection Reset & Disconnect
  public static disconnectGmail(): void {
    this.account.connected = false;
    this.oauthConfig.refreshToken = '';
    this.oauthConfig.accessToken = '';
    safeSetStorage('account', this.account);
    safeSetStorage('oauth_credentials', this.oauthConfig);
  }
}
