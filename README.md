![assignment_page-0001](https://github.com/user-attachments/assets/de695350-7450-4824-b3d9-e5fbfe4cf524)


# **Full-Stack Healthcare Profile Management Platform with Next.js**

This project is a healthcare-focused web application where patients can securely fill in and manage their personal health information, while administrators can monitor patient data in **real time**. Built with a modern full-stack approach using **Next.js, MongoDB, JWT-based authentication, Pusher, and Tailwind CSS**, the application is designed to store and track patient information over time with a clean,**responsive UI and real-time synchronization.**

## **Backend & Server-Side Services**

- **Next.js API Routes**

  - Handles authentication, user registration, and profile management

- **Token-Based Authentication (JWT)**

  - Implements sign-in and sign-up flows using JSON Web Tokens
  - Passwords are securely hashed using bcryptjs

- **MongoDB with Mongoose**

  - Stores patient profiles, authentication data, and role information
  - Schema-based modeling ensures reliable and structured data storage

- **Real-Time Updates (Pusher)**
  - Admin dashboard updates instantly when
    - A new patient signs up successfully
    - A patient updates their profile information

## **Frontend Development**

- **Next.js with TypeScript**

  - Provides routing, SSR, and full-stack capabilities
  - Type-safe and maintainable codebase

- **Tailwind CSS**

  - Utility-first styling for a responsive and modern UI

- **Shadcn Components**

  - Accessible UI primitives such as dialogs, selects, and accordions
  - Improves form usability and admin interface clarity

- **Lucide React Icons**

  - Minimal and consistent icons used throughout the application

- **Form Handling**
  - React Hook Form for efficient form state management
  - Zod integration via @hookform/resolvers for validation

## **Application Features & Page Flow**

**1.Home Page**

- Accessible by both patients and admins
- Serves as the main entry point of the application

**2.Authentication Pages (Sign In / Sign Up)**

- Secure JWT-based authentication system
- Patients can register and log in using validated credentials

**3.Profile Page (Patient Only)**

- Allows patients to
  - View personal and health-related information
  - Update their profile details
- All updates are reflected instantly on the Admin Dashboard

**4.Admin Dashboard (Admin Only)**

- Displays a real-time list of registered patients
- Updates automatically when
  - A new patient signs up
  - A patient updates their profile

## **Technologies Used**

- ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white&style=flat) **Next.js**
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat) **TypeScript**
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) **MongoDB + Mongoose**
- ![Pusher](https://img.shields.io/badge/-Pusher-300D4F?logo=pusher&logoColor=white&style=flat) **Pusher (Real-Time Updates)**
- ![TailwindCSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat) **Tailwind CSS**
- ![shadcn/ui](https://img.shields.io/badge/-shadcn/ui-000000?style=flat) **shadcn/ui**
- ![Radix UI](https://img.shields.io/badge/-Radix%20UI-111111?logo=radixui&logoColor=white&style=flat) **Radix UI**
- ![Lucide](https://img.shields.io/badge/-Lucide%20Icons-000000?logo=lucide&logoColor=white&style=flat) **Lucide React**
- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white&style=flat) **React Hook Form**
- ![Zod](https://img.shields.io/badge/-Zod-3E64FF?logo=zod&logoColor=white&style=flat) **Zod**
- ![Sonner](https://img.shields.io/badge/-Sonner-191919?style=flat&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIvPjwvc3ZnPg==) **Sonner**

## **Installation & Setup**

Follow the steps below to clone, configure, and run the project locally.

#### **1. Clone the Repository**

```bash
git clone https://github.com/Danaiwee/project-healthcare.git
cd your-repository-name
```

#### **2. Install Dependencies**

Make sure you have Node.js (v18 or later) installed.

```bash
npm install
```

#### **3. Environment Variables**

Create a .env file in the root directory and add the following environment variables:

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Pusher
NEXT_PUBLIC_PUSHER_APP_ID=""
NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY=""
PUSHER_SECRET_KEY=""
NEXT_PUBLIC_PUSHER_CLUSTER=""
```

#### **4. Run the Development Server**

```bash
npm run dev
```

The application will be available at:

```bash
http://localhost:3000
```

#### **5.Build for Production (Optional)**

```bash
npm run build
npm start
```
