# AGENTS.md — N&G Partitions Website Build Rules

## Project Identity

Build a premium portfolio website for **N&G Partitions LTD**, a UK commercial construction and interior specialist.

The company specializes in:
- Steel Framing Systems (SFS)
- Drylining & Partitions
- Suspended Ceilings
- Acoustic Solutions
- Commercial Interior Fit-Outs

Contact details:
- Company: N&G Partitions LTD
- Address: 97 Whittlesey Road, Peterborough, PE2 8RW
- Phone: 00447918406766
- Email: ng.partitionsltd@gmail.com
- Target domain: ngpartitions.co.uk

## Core Product Goal

Create a high-trust, premium, cinematic portfolio website that makes the business look like an elite UK commercial interiors contractor capable of winning serious projects.

This is not a cheap generic construction website. It should feel closer to:
- luxury architectural studios
- premium commercial developers
- high-end interior design firms
- elite specialist contractors

## Design Direction

The visual identity must be:
- premium
- architectural
- cinematic
- minimal
- refined
- technically precise
- trustworthy
- commercial
- modern
- elegant

Use large imagery, strong typography, generous spacing, dark/light contrast, subtle animations, and an editorial case-study presentation style.

Avoid:
- generic construction templates
- cheap contractor website layouts
- cartoon icons
- neon sci-fi visuals
- overused SaaS styling
- excessive glassmorphism
- clutter
- flashy gimmicks
- low-quality stock-photo aesthetics

## Key Pages

Build these public pages:
- Home
- About
- Services
- Steel Framing Systems
- Drylining & Partitions
- Suspended Ceilings
- Acoustic Solutions
- Projects
- Project Detail
- Contact

## Homepage Sections

The homepage should include:
1. Cinematic hero section using the uploaded hero video
2. Premium positioning statement
3. Services overview
4. Featured projects
5. Why choose us
6. Industries served
7. Process/workflow
8. Certifications/accreditations placeholder
9. Manufacturer/partner brands placeholder
10. CTA section
11. Footer

Hero copy:
- Main heading: Drylining & Interior Specialists
- Subheading: Precision-built commercial interiors across the UK.
- Supporting line: Partitions, Suspended Ceilings, SFS & Acoustic Solutions
- Buttons: View Projects, Get in Touch

## Service Pages

Each service page should include:
- hero section
- service overview
- technical capabilities
- applications
- process/quality section
- relevant imagery
- CTA

Services:
- Steel Framing Systems (SFS)
- Drylining & Partitions
- Suspended Ceilings
- Acoustic Solutions

## Project System

The Projects section should feel like architectural case studies, not basic gallery cards.

Each project should support:
- title
- slug
- short description
- full description
- service tags
- location optional
- status optional: Completed / Ongoing
- featured toggle
- multiple images
- created/updated timestamps if using a database

## Admin Panel Guidance

Only build an admin panel if explicitly requested in the active task.

If admin is required:
- Admin must not appear in the main public navigation.
- Admin route should be private, e.g. /admin or preferably a less obvious route if requested.
- Require login.
- Never hardcode production credentials.
- Use environment variables.
- Include .env.example.
- Keep upload/storage/database choices simple and deployable.

Recommended admin stack if needed:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + SQLite for local development
- Auth through environment-based credentials or a simple secure auth layer
- Local uploads to public/uploads for MVP
- Keep migration path open to Supabase/S3 later

If admin is not required:
- Use static project data in JSON/TypeScript files.
- Keep the site fast, secure, and cheap to deploy.
- Make content easy for a developer to update.

## Asset Management

Inspect uploaded assets and organize them cleanly.

Suggested structure:
public/
  assets/
    video/
      hero.mp4
    images/
      hero/
      services/
      projects/
      sfs/
      drylining/
      ceilings/
      acoustics/

Use meaningful file names. Do not leave messy names like IMG_1234 or final-final-v2.

Hero video behavior:
- autoplay
- muted
- loop
- playsInline
- dark gradient overlay
- fallback image for mobile/low bandwidth

## Technical Requirements

Use:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion for subtle premium animation
- Clean reusable components
- Responsive design
- SEO metadata
- accessible contrast
- optimized media loading
- production-ready code structure

## Quality Bar

The website must look client-presentation ready.

Do not produce a basic template.
Do not overcomplicate the architecture.
Prioritize:
- premium visual impact
- strong trust signals
- clean code
- fast loading
- maintainable structure
- realistic deployment path

## Build Process

Before coding:
1. Inspect the repository.
2. Inspect uploaded assets.
3. Identify existing framework and dependencies.
4. Create a short implementation plan.
5. Then execute.

After coding:
1. Run lint/build if available.
2. Fix errors.
3. Confirm responsive behavior.
4. Provide run instructions.
5. Mention any assumptions or unfinished items clearly.
