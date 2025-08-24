declare module 'nodemailer' {
  interface TransportOptions {
    host: string; port: number; secure: boolean; auth?: { user: string; pass: string }; tls?: Record<string, unknown>;
  }
  interface SendMailOptions { from: string; to: string; bcc?: string; subject: string; html: string; }
  interface Transporter { sendMail(opts: SendMailOptions): Promise<unknown>; }
  export function createTransport(opts: TransportOptions): Transporter;
  const _default: { createTransport: typeof createTransport };
  export default _default;
}
