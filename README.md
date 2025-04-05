  ##  Job Tracker

Track your job applications.  
Built using **Next.js**, **Supabase**, **Tailwind CSS**, **TypeScript**, and **shadcn/ui**.

---

##  Features

-  **Google Authentication** (via Supabase Auth)
-  **Secure Form** to log job applications
-  **Dashboard UI** using components by `shadcn/ui`
-  **Row-Level Security** to isolate data per user
-  **Hosted on Netlify**

---

##  Demo

Live Site: [jobtracker.salmanvirji.com](https://jobtracker.salmanvirji.com)



---

##  Tech Stack

| Frontend | Backend / Auth | Styling | Tools |
|----------|----------------|---------|-------|
| Next.js  | Supabase DB + Auth | Tailwind CSS | TypeScript |
| React    | RLS + Postgres     | Shadcn/UI     | Vite        |

---

##  Project Goals

- Full-stack web app development
- Authentication and session management
- Dynamic dashboard UI
- Working with cloud-hosted databases
- Building a solo personal project with production polish

---

##  Setup Instructions

1. Clone this repo  
   `git clone https://github.com/Salman-Virji/job-tracker`

2. Install dependencies  
   `npm install`

3. Create a `.env.local` file with your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
