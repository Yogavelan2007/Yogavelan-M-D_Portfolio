// Signal Architecture style reminder: external integration stays isolated from UI and never exposes non-public credentials.

import emailjs from "@emailjs/browser";

const emailjsConfig = {
  serviceId: "service_fpbwmoi",
  templateId: "template_oisi5b2",
  publicKey: "o8doBuuFKHG5Wed-f",
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(payload: ContactPayload) {
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  return emailjs.send(
    emailjsConfig.serviceId,
    emailjsConfig.templateId,
    {
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      subject: payload.subject,
      message: payload.message,
      visitor_name: payload.name,
      visitor_email: payload.email,
      email_subject: payload.subject,
      visitor_message: payload.message,
      submitted_at: submittedAt,
      portfolio_name: "Yogavelan M. D. Portfolio",
    },
    { publicKey: emailjsConfig.publicKey },
  );
}
