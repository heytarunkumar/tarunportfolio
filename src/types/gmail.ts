export interface GmailAccount {
  email: string;
  name: string;
  connected: boolean;
  lastSync?: string;
  quotaUsed?: string;
  messagesTotal?: number;
  threadsTotal?: number;
  unreadCount?: number;
}

export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailPayloadPart {
  partId?: string;
  mimeType: string;
  filename?: string;
  headers?: GmailHeader[];
  body?: {
    data?: string;
    attachmentId?: string;
    size?: number;
  };
  parts?: GmailPayloadPart[];
}

export interface GmailPayload {
  partId?: string;
  mimeType: string;
  filename?: string;
  headers: GmailHeader[];
  body?: {
    data?: string;
    size?: number;
  };
  parts?: GmailPayloadPart[];
}

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId?: string;
  internalDate: string; // ms string
  payload?: GmailPayload;
  sizeEstimate?: number;
  raw?: string;
  starred?: boolean;
  unread?: boolean;
  
  // Parsed convenience fields
  from?: { name: string; email: string };
  to?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  dateStr?: string;
  bodyHtml?: string;
  bodyText?: string;
  attachments?: GmailAttachment[];
}

export interface GmailThread {
  id: string;
  historyId?: string;
  messages: GmailMessage[];
  snippet?: string;
  lastMessageDate?: string;
  subject?: string;
  participants?: { name: string; email: string }[];
  unread?: boolean;
  starred?: boolean;
  labelIds?: string[];
}

export interface GmailAttachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  attachmentId?: string;
  messageId?: string;
  dataUrl?: string;
}

export interface GmailLabel {
  id: string;
  name: string;
  messageListVisibility?: string;
  labelListVisibility?: string;
  type: 'system' | 'user';
  messagesTotal?: number;
  messagesUnread?: number;
  color?: {
    textColor?: string;
    backgroundColor?: string;
  };
}

export interface GmailDraft {
  id: string;
  message: GmailMessage;
}

export interface MailSearchQuery {
  q?: string;
  from?: string;
  to?: string;
  subject?: string;
  isUnread?: boolean;
  hasAttachment?: boolean;
  after?: string;
  before?: string;
  labelId?: string;
}

export interface SendMailRequest {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  isHtml?: boolean;
  threadId?: string;
  inReplyTo?: string;
  references?: string;
  attachments?: { filename: string; mimeType: string; dataUrl: string }[];
}

export interface OAuthCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken?: string;
  accessToken?: string;
  expiryDate?: number;
}
