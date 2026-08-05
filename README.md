# Workout Planner

> 🚧 **Work in Progress**  
> This project is actively under development as I continue learning and applying modern Next.js patterns. Features and documentation will continue to evolve.

A full-stack workout planning application built with **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL**. The goal is to create, organize, and manage personalized workout routines while showcasing modern full-stack development practices.

## Features

### Current

- Create workouts
- View all workouts
- View workout details
- Add exercises to workouts
- Automatically order exercises
- Responsive UI with Tailwind CSS
- Server Actions for data mutations
- Repository pattern for data access
- Prisma ORM with PostgreSQL (Neon)
- Deployed with Vercel

### Planned

- Edit and delete workouts
- Edit and delete exercises
- Authentication
- Exercise reordering
- Improved exercise form
- Dashboard and workout analytics
- Workout templates
- Enhanced UI/UX

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Tailwind CSS
- Vercel

## Architecture

This project follows a layered architecture to keep concerns separated:

```text
Pages
   ↓
Server Actions
   ↓
Repository Layer
   ↓
Prisma ORM
   ↓
PostgreSQL
```

## What I'm Practicing

This project is focused on strengthening experience with:

- Next.js App Router
- Server Components
- Server Actions
- Dynamic routing
- Prisma data modeling
- Repository pattern
- TypeScript
- PostgreSQL
- GitHub Projects, Issues, and Pull Requests

## Running Locally

```bash
npm install
npm run dev
```

Create a `.env` file with your PostgreSQL connection string before running the application.

## Roadmap

- [x] Create workouts
- [x] View workouts
- [x] Workout details
- [x] Add exercises
- [ ] Enhance exercise form
- [ ] Edit workouts
- [ ] Edit exercises
- [ ] Delete workouts
- [ ] Delete exercises
- [ ] Authentication
- [ ] Drag-and-drop exercise ordering

---

_This project is being developed incrementally using feature branches, pull requests, and GitHub Projects to mirror a professional development workflow._
