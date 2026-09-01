import type { SendMailRequest } from '../types/gmail';

/**
 * Builds RFC 2822 compliant MIME message string and base64url encodes it for the Gmail API.
 */
export function buildMimeMessage(req: SendMailRequest, fromEmail: string): string {
  const boundary = `====_NextPart_${Date.now().toString(16)}_${Math.random().toString(16).substring(2)}====`;
  const hasAttachments = req.attachments && req.attachments.length > 0;

  const headers: string[] = [];
  headers.push(`From: ${fromEmail}`);
  headers.push(`To: ${req.to}`);
  if (req.cc) headers.push(`Cc: ${req.cc}`);
  if (req.bcc) headers.push(`Bcc: ${req.bcc}`);
  headers.push(`Subject: ${req.subject}`);
  headers.push(`Date: ${new Date().toUTCString()}`);
  headers.push(`MIME-Version: 1.0`);

  if (req.inReplyTo) {
    headers.push(`In-Reply-To: ${req.inReplyTo}`);
  }
  if (req.references) {
    headers.push(`References: ${req.references}`);
  }

  let mimeBody = '';

  if (hasAttachments) {
    headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    mimeBody += `--${boundary}\r\n`;
    mimeBody += `Content-Type: text/html; charset="UTF-8"\r\n`;
    mimeBody += `Content-Transfer-Encoding: 7bit\r\n\r\n`;
    mimeBody += `${req.body}\r\n\r\n`;

    for (const att of req.attachments!) {
      mimeBody += `--${boundary}\r\n`;
      mimeBody += `Content-Type: ${att.mimeType}; name="${att.filename}"\r\n`;
      mimeBody += `Content-Disposition: attachment; filename="${att.filename}"\r\n`;
      mimeBody += `Content-Transfer-Encoding: base64\r\n\r\n`;
      
      // Extract base64 content from dataUrl if necessary
      const base64Data = att.dataUrl.includes(',')
        ? att.dataUrl.split(',')[1]
        : att.dataUrl;

      mimeBody += `${base64Data}\r\n\r\n`;
    }

    mimeBody += `--${boundary}--`;
  } else {
    headers.push(`Content-Type: text/html; charset="UTF-8"`);
    mimeBody = req.body;
  }

  const fullRawMessage = `${headers.join('\r\n')}\r\n\r\n${mimeBody}`;

  // Encode raw string to base64url format
  return encodeBase64Url(fullRawMessage);
}

/**
 * Base64url encoding helper for Gmail API.
 * Replaces + with -, / with _, and strips padding =
 */
export function encodeBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = typeof window !== 'undefined' && window.btoa 
    ? window.btoa(binary)
    : globalThis.btoa(binary);

  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
