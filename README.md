# Yogavelan M D Portfolio

This project is a React 19, Vite, Tailwind CSS, Framer Motion, and GSAP portfolio focused on VLSI design, embedded systems, FPGA, AI, and hardware-software integration.

## Contact Form Configuration

The contact form is wired for EmailJS through the `client/src/utils/emailService.ts` abstraction. Copy `.env.example` to `.env` and confirm that the three `VITE_EMAILJS_*` values match the EmailJS service, template, and public key you intend to use. The EmailJS template should expose fields matching `from_name`, `from_email`, `reply_to`, `subject`, and `message`.

The current form validates required fields and email format, provides a loading state, displays success/error notifications, and resets only after a successful send. If environment values have not been configured, it safely reports that the form is not configured rather than attempting to submit.

## Updating Content

Portfolio content is centralized in `client/src/data/portfolio.ts`. Coding-platform profile links and verified statistics are isolated in `client/src/data/codingProfiles.ts`; their metrics intentionally remain `null` until verified values are provided.

## Resume

No resume file was provided during implementation. The UI keeps the resume action present and explains this accurately until a verified resume URL or asset is attached.

