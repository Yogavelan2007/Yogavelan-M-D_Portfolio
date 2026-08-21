# Yogavelan M D — VLSI & Embedded Systems Portfolio

> A responsive portfolio website for **Yogavelan M. D.**, focused on VLSI design, embedded systems, FPGA development, AI-driven hardware, and practical electronics engineering.

## Overview

This repository contains a modern React portfolio built to present engineering experience, technical skills, projects, certifications, coding profiles, and contact options in a dark/light **Signal Architecture** interface.

## Features

| Area | Included capabilities |
| --- | --- |
| Responsive design | Desktop, tablet, and mobile layouts with adaptive navigation. |
| Visual identity | Custom electronics artwork, project visuals, technical grid treatment, and dark/light theme switching. |
| Portfolio content | Experience timeline, six engineering projects, technical skills, certifications, and coding profiles. |
| Coding metrics | Viewport-triggered, one-time count-up animation driven by profile data. |
| Contact paths | GitHub, LinkedIn, Gmail compose links, Google Drive resume link, and an EmailJS contact form. |
| Accessibility | Semantic sections, labelled interactive controls, visible focus states, and reduced-motion support. |

## Technology Stack

| Technology | Purpose |
| --- | --- |
| React 19 + TypeScript | Component-based user interface and type safety. |
| Vite | Development server and production build tooling. |
| Tailwind CSS | Responsive styling and design tokens. |
| Framer Motion + GSAP | Motion and scroll-triggered animation. |
| EmailJS | Client-side contact-form delivery. |
| Lucide React | Interface icons. |


## Available Commands

```bash
# Start the local development server
pnpm dev

# Create an optimized production build
pnpm build

# Run TypeScript checks
pnpm check
```

## Project Structure

```text
client/
├── public/
│   └── images/                 # Local portfolio visuals and platform logos
└── src/
    ├── components/             # Navigation, modals, loading UI, shared components
    ├── contexts/               # Theme state
    ├── data/                   # Portfolio, project, skill, and coding-profile data
    ├── hooks/                  # GSAP integration hooks
    ├── pages/                  # Home page
    └── utils/                  # EmailJS contact service
```

## Updating Portfolio Content

The primary content files are intentionally centralized for easy maintenance.

| Update | File |
| --- | --- |
| Projects, experience, skills, and certifications | `client/src/data/portfolio.ts` |
| Coding-platform links and metrics | `client/src/data/codingProfiles.ts` |
| Contact and page layout | `client/src/pages/Home.tsx` |
| EmailJS request formatting | `client/src/utils/emailService.ts` |
| Local images | `client/public/images/` |

> Keep coding statistics in `codingProfiles.ts` as numeric values. The interface adds the configured suffix, such as `+`, during its count-up animation.

## EmailJS Contact Form

The contact form sends the following template variables:

```text
from_name
from_email
reply_to
subject
message
```

When using your own EmailJS account, update the Service ID, Template ID, and Public Key in `client/src/utils/emailService.ts`. Restrict the EmailJS public key to the domains where the portfolio is hosted.

## Contact

- **GitHub:** [Yogavelan2007](https://github.com/Yogavelan2007)
- **LinkedIn:** [Yogavelan M D](https://www.linkedin.com/in/yogavelan-m-d-499b52312/)
- **Email:** [yogavelanmd@gmail.com](mailto:yogavelanmd@gmail.com)

## License

This project is intended as a personal portfolio. Please do not reuse the portfolio content, personal details, or custom visual identity without permission.
