# FitLog — Workout Library

FitLog is a responsive workout library and workout planning web application built with Next.js. It allows users to browse workouts, view detailed workout information, add exercises to today's plan, save workouts for later, mark workouts as completed, and track total workout time and calories.

## Live Project

Live Demo: https://fit-log-blond.vercel.app/

GitHub Repository: https://github.com/najmuntushi-hue/fit-log

## Technologies Used

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Next.js App Router
- REST API
- Browser LocalStorage
- Vercel

## Features

1. **Workout Library**
   - Displays workouts fetched from the FitLog API.
   - Responsive workout cards for mobile, tablet, and desktop.
   - Shows workout category, equipment, duration, calories, and rating.

2. **Workout Details**
   - Dedicated detail page for every workout.
   - Displays workout image, description, tags, specifications, and instructions.
   - Users can add workouts to their plan or save them for later.

3. **My Plan**
   - Shows workouts added to today's training plan.
   - Displays total exercises, workout minutes, and calories.
   - Users can mark workouts as completed or remove them.

4. **Saved Workouts**
   - Users can save workouts for later.
   - Saved workouts can be viewed from the My Plan page.

5. **Plan and Saved Counters**
   - Navbar displays live Plan and Saved workout counts.
   - Counters update when workouts are added or removed.

6. **Workout Sorting**
   - Sort workouts by Duration, Calories, or Rating.
   - Duration is selected by default.

7. **Local Storage**
   - Plan, saved workouts, and completed workout states are stored in browser LocalStorage.
   - User data remains available after refreshing the page.

8. **Responsive Design**
   - Optimized for mobile, tablet, and desktop screen sizes.
   - Uses a dark fitness-focused visual design.

9. **Toast Notifications**
   - Provides feedback when workouts are added, saved, completed, or removed.

10. **Loading and Empty States**
    - Displays loading indicators while workout data is being fetched.
    - Provides helpful empty states when there are no planned or saved workouts.

## API

FitLog uses the following REST API:

- Workout list:
  `https://api.abcz.workers.dev/api/fitlog`

- Workout details:
  `https://api.abcz.workers.dev/api/fitlog/:id`

## Project Structure

```text
fitlog-final/
├── app/
│   ├── my-plan/
│   │   └── page.tsx
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── WorkoutCard.tsx
│
├── context/
│   └── FitLogContext.tsx
│
├── lib/
│   └── api.ts
│
├── types/
│   └── workout.ts
│
├── public/
│   └── ...
│
├── package.json
└── README.md
