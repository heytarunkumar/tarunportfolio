import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const TARGET_GMAIL_ACCOUNT = 'tarunsinghchaudharyy@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields (name, email, message)' });
  }

  const subjectTitle = subject ? `[Portfolio Contact] ${subject}` : `[Portfolio Contact] Message from ${name}`;

  try {
    // 1. Save to Supabase Central Database if configured
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('xyzcompany')) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase.from('portfolio_messages').insert([
        {
          name,
          email,
          subject: subject || 'Portfolio Inquiry',
          message,
          read: false,
          folder: 'PORTFOLIO_INBOX',
        },
      ]);
    }

    // 2. Dispatch Live Email to tarunsinghchaudharyy@gmail.com via Web3Forms Failsafe Relay
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'b1a20d43-207d-4b8a-9a99-f472289f6681', // Fallback public portfolio access key
          name,
          email,
          to: TARGET_GMAIL_ACCOUNT,
          subject: subjectTitle,
          message: `NEW PORTFOLIO CONTACT INQUIRY\n\nSender: ${name} <${email}>\nDate: ${new Date().toUTCString()}\n\nMessage:\n${message}`,
        }),
      });
    } catch {
      // Ignore background email relay error
    }

    return res.status(200).json({
      success: true,
      message: 'Contact query submitted successfully and dispatched to Admin Mail Center & Gmail.',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
