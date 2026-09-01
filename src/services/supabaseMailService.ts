import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { GmailThread } from '../types/gmail';

export interface SupabaseContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
}

export class SupabaseMailService {
  /**
   * Insert contact query directly into Supabase database table `portfolio_messages` & local fallback
   */
  public static async saveContactQuery(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<{ success: boolean; data?: any; error?: string }> {
    // Save to local storage cache so queries from all visitors appear in Admin Mail Center
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem('tarun_portfolio_all_contact_queries') || '[]');
        const newItem: SupabaseContactMessage = {
          id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          created_at: new Date().toISOString(),
          name: data.name,
          email: data.email,
          subject: data.subject || 'Portfolio Inquiry',
          message: data.message,
          read: false,
        };
        saved.unshift(newItem);
        localStorage.setItem('tarun_portfolio_all_contact_queries', JSON.stringify(saved));
      } catch {
        // ignore storage error
      }
    }

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { data: inserted, error } = await supabase
        .from('portfolio_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject || 'Portfolio Inquiry',
            message: data.message,
            read: false,
          },
        ])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: inserted };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save to Supabase database.' };
    }
  }

  /**
   * Fetch all portfolio enquiries from Supabase database table `portfolio_messages` & local fallback
   */
  public static async fetchContactQueries(): Promise<GmailThread[]> {
    let rawMessages: SupabaseContactMessage[] = [];

    // 1. Fetch from Local Storage Fallback
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem('tarun_portfolio_all_contact_queries') || '[]');
        rawMessages = [...saved];
      } catch {
        // ignore
      }
    }

    // 2. Fetch from Supabase Cloud Database if configured
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from('portfolio_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          const existingIds = new Set(rawMessages.map((m) => m.id));
          data.forEach((item: SupabaseContactMessage) => {
            if (!existingIds.has(item.id)) {
              rawMessages.push(item);
            }
          });
        }
      } catch {
        // fallback
      }
    }

    return rawMessages.map((item: SupabaseContactMessage) => ({
      id: `db_msg_${item.id || Date.now()}`,
      subject: item.subject ? `[Portfolio Inquiry] ${item.subject}` : `[Portfolio Inquiry] Message from ${item.name}`,
        snippet: item.message.substring(0, 100),
        lastMessageDate: item.created_at ? new Date(item.created_at).toISOString().replace('T', ' ').substring(0, 16) : new Date().toISOString().replace('T', ' ').substring(0, 16),
        unread: item.read === false,
        starred: false,
        labelIds: ['INBOX', 'Label_Projects'],
        participants: [
          { name: item.name, email: item.email },
          { name: 'Tarun Kumar', email: 'tarunsinghchaudharyy@gmail.com' },
        ],
        messages: [
          {
            id: `msg_db_${item.id}`,
            threadId: `db_msg_${item.id}`,
            labelIds: ['INBOX', 'Label_Projects'],
            snippet: item.message.substring(0, 100),
            internalDate: item.created_at ? new Date(item.created_at).getTime().toString() : Date.now().toString(),
            starred: false,
            unread: item.read === false,
            from: { name: item.name, email: item.email },
            to: 'tarunsinghchaudharyy@gmail.com',
            subject: item.subject ? `[Portfolio Inquiry] ${item.subject}` : `[Portfolio Inquiry] Message from ${item.name}`,
            dateStr: item.created_at ? new Date(item.created_at).toLocaleString() : new Date().toLocaleString(),
            bodyText: item.message,
            bodyHtml: `<div style="font-family: monospace; color: #E8DFD8; background-color: #0F0C09; padding: 16px; border: 1px solid rgba(140, 109, 79, 0.4); border-radius: 4px;">
              <h3 style="color: #D4AF37; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase;">SUPABASE CENTRAL DATABASE QUERY</h3>
              <p style="margin: 4px 0;"><strong style="color: #C4B5A5;">Sender:</strong> ${item.name} &lt;${item.email}&gt;</p>
              <p style="margin: 4px 0;"><strong style="color: #C4B5A5;">Database Record ID:</strong> ${item.id}</p>
              <hr style="border: none; border-top: 1px solid rgba(140, 109, 79, 0.3); margin: 12px 0;" />
              <p style="white-space: pre-wrap; font-size: 13px; color: #FFFFFF; font-family: sans-serif; line-height: 1.6; margin: 0;">${item.message}</p>
            </div>`,
          },
        ],
      }));
  }

  /**
   * Supabase Admin Auth: Sign In Admin
   */
  public static async signInAdmin(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase URL & Anon Key not configured in .env' };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user, session: data.session };
  }

  /**
   * Supabase Admin Auth: Sign Up / Register Admin
   */
  public static async signUpAdmin(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase URL & Anon Key not configured in .env' };
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user };
  }

  /**
   * Supabase Admin Auth: Get Current Admin Session
   */
  public static async getCurrentSession() {
    if (!isSupabaseConfigured()) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  /**
   * Supabase Admin Auth: Sign Out Admin
   */
  public static async signOutAdmin() {
    if (!isSupabaseConfigured()) return;
    await supabase.auth.signOut();
  }
}
