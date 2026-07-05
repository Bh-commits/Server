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

