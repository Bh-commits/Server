import nodemailer from 'nodemailer';
import { env } from './env.js';

const isMailerConfigured = Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);

export const transporter = isMailerConfigured
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass
      }
    })
  : null;

export async function sendMail({ to, subject, html, text }) {
  if (!transporter) {
    throw new Error('Email service is not configured');
  }

  return transporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html,
    text
  });
}

