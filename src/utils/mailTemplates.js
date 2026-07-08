export function leadAdminTemplate(lead) {
  return {
    subject: `New ${lead.type} request from ${lead.name}`,
    html: `
      <h2>New ${lead.type} request</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Company:</strong> ${lead.company || '-'}</p>
      <p><strong>Business Type:</strong> ${lead.businessType}</p>
      <p><strong>Message:</strong> ${lead.message}</p>
    `,
    text: `New ${lead.type} request from ${lead.name}. Phone: ${lead.phone}. Email: ${lead.email}. Message: ${lead.message}`
  };
}

export function leadCustomerTemplate(lead) {
  return {
    subject: 'Thank you for contacting IdeaClap India',
    html: `
      <p>Hi ${lead.name},</p>
      <p>Thank you for contacting IdeaClap India. We received your request and our team will get back to you shortly.</p>
      <p>Regards,<br/>IdeaClap India</p>
    `,
    text: `Hi ${lead.name}, thank you for contacting IdeaClap India. We received your request and our team will get back to you shortly.`
  };
}

export function applicationAdminTemplate(application) {
  return {
    subject: `New job application from ${application.name}`,
    html: `
      <h2>New job application</h2>
      <p><strong>Name:</strong> ${application.name}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Phone:</strong> ${application.phone}</p>
      <p><strong>Message:</strong> ${application.message || '-'}</p>
      <p><strong>Resume:</strong> ${application.resume?.url || 'Attached via storage'}</p>
    `,
    text: `New job application from ${application.name}. Email: ${application.email}. Phone: ${application.phone}.`
  };
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function tableRow(label, value) {
  return `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #e8edf5;color:#52606d;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;width:34%;">${label}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #e8edf5;color:#10233f;font-size:15px;line-height:1.6;word-break:break-word;">${value || '-'}</td>
    </tr>
  `;
}

export function careerApplicationAdminTemplate(application) {
  const submittedAt = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  }).format(application.createdAt || new Date());

  const linkedin = application.linkedin
    ? `<a href="${escapeHtml(application.linkedin)}" style="color:#0b63ce;text-decoration:none;">${escapeHtml(application.linkedin)}</a>`
    : '-';
  const portfolio = application.portfolio
    ? `<a href="${escapeHtml(application.portfolio)}" style="color:#0b63ce;text-decoration:none;">${escapeHtml(application.portfolio)}</a>`
    : '-';
  const resumeLink = `<a href="${escapeHtml(application.resumeLink)}" style="color:#0b63ce;text-decoration:none;">${escapeHtml(application.resumeLink)}</a>`;

  const html = `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#10233f;">
        <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
          <div style="background:#081f52;border-radius:18px 18px 0 0;padding:28px 24px;color:#ffffff;">
            <p style="margin:0 0 8px;color:#c68b59;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;">Career Application</p>
            <h1 style="margin:0;font-size:26px;line-height:1.25;">New Internship Application Received</h1>
          </div>
          <div style="background:#ffffff;border:1px solid #e8edf5;border-top:0;border-radius:0 0 18px 18px;overflow:hidden;box-shadow:0 14px 34px rgba(8,31,82,.08);">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${tableRow('Applicant Name', escapeHtml(application.fullName))}
              ${tableRow('Email Address', `<a href="mailto:${escapeHtml(application.email)}" style="color:#0b63ce;text-decoration:none;">${escapeHtml(application.email)}</a>`)}
              ${tableRow('Phone Number', escapeHtml(application.phone))}
              ${tableRow('LinkedIn URL', linkedin)}
              ${tableRow('Portfolio / GitHub', portfolio)}
              ${tableRow('Resume Link', resumeLink)}
              ${tableRow('Cover Message', escapeHtml(application.coverMessage).replace(/\n/g, '<br>'))}
              ${tableRow('Submission Date & Time', escapeHtml(submittedAt))}
            </table>
            <div style="padding:18px 20px;color:#7a8796;font-size:12px;line-height:1.6;background:#fbfcfe;">
              This notification was generated automatically from the IdeaClap India careers form.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return {
    subject: '🚀 New Internship Application Received',
    html,
    text: [
      'New Internship Application Received',
      `Applicant Name: ${application.fullName}`,
      `Email Address: ${application.email}`,
      `Phone Number: ${application.phone}`,
      `LinkedIn URL: ${application.linkedin || '-'}`,
      `Portfolio / GitHub: ${application.portfolio || '-'}`,
      `Resume Link: ${application.resumeLink}`,
      `Cover Message: ${application.coverMessage || '-'}`,
      `Submission Date & Time: ${submittedAt}`
    ].join('\n')
  };
}

