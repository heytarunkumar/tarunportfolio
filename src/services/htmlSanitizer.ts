/**
 * Security HTML Sanitizer for Email Bodies
 * Sanitizes untrusted HTML content received in email messages.
 * Strips script tags, unsafe event handlers (onload, onerror, etc.), javascript: URIs,
 * iframe/object/embed tags, and prevents DOM XSS injection.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // 1. Remove dangerous tags completely
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  clean = clean.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  clean = clean.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  clean = clean.replace(/<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi, '');
  clean = clean.replace(/<base\b[^>]*>/gi, '');

  // 2. Remove inline event handlers (on*="...")
  clean = clean.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // 3. Neutralize javascript: URIs
  clean = clean.replace(/href\s*=\s*['"]?\s*javascript:[^'"]*['"]?/gi, 'href="#"');
  clean = clean.replace(/src\s*=\s*['"]?\s*javascript:[^'"]*['"]?/gi, 'src="#"');

  // 4. Ensure links open safely in a new target tab with rel="noopener noreferrer"
  clean = clean.replace(/<a\s+(?:[^>]*?\s+)?href=/gi, (match) => {
    return `${match} target="_blank" rel="noopener noreferrer" `;
  });

  // 5. Replace dark/black text inline colors for high contrast in dark mode
  clean = clean.replace(/color:\s*(?:#111111|#111|#000000|#000|#222222|#222|#333333|#333|#1a1a1a|#0f0f0f|black|darkslate[a-z]*)\b;?/gi, 'color: #E8DFD8;');

  return clean;
}
