# 📊 Visor - Financial Supervision & Analytics Web App

[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

**Visor** is a modern, full-stack personal financial dashboard and tracking web application. Built with **Next.js 14**, **Hono**, **Clerk Auth**, **Drizzle ORM**, **Neon Postgres**, and **TanStack Table**, it provides intuitive account tracking, transaction management, CSV data imports, and interactive financial reporting.

---

## ✨ Features

- 🔐 **Secure Authentication**: User management & multi-account security powered by **Clerk**.
- 📈 **Financial Dashboard**: Overview of income, expenses, net balance, and interactive charts over custom date ranges.
- 💳 **Multi-Account & Category Management**: Track multiple bank accounts, credit lines, and custom transaction categories.
- 📋 **Interactive Data Grids**: High-performance transaction tables built with **TanStack Table v8** (filtering, sorting, bulk actions, pagination).
- 📥 **CSV Transaction Import**: Parse and import bank statements seamlessly using **PapaParse**.
- ⚡ **Hono RPC API Sub-routing**: High-speed API layer combined with **TanStack Query** for real-time reactivity and caching.
- 🗄️ **Database Infrastructure**: Type-safe relational schema managed by **Drizzle ORM** and hosted on **Neon PostgreSQL**.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) + [Hono](https://hono.dev/) |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs` + `@hono/clerk-auth`) |
| **Database & ORM** | [Neon PostgreSQL](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/) |
| **Data Tables & State** | [TanStack Table](https://tanstack.com/table) + [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query) |
| **Styling & Icons** | [Tailwind CSS](https://tailwindcss.com/) + Radix UI + [Lucide React](https://lucide.dev/) |
| **CSV Parsing** | [PapaParse](https://www.papaparse.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17` or higher (or [Bun](https://bun.sh/))
- **PostgreSQL Database**: A [Neon](https://neon.tech/) database instance
- **Clerk Account**: API keys for Clerk Authentication

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Devmustroc/visor.git
   cd visor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   DATABASE_URL=postgresql://user:password@ep-sample.neon.tech/visor?sslmode=require
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run database migrations**:
   ```bash
   npx drizzle-kit migrate
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
visor/
├── app/                  # Next.js 14 App Router routes & layouts
│   ├── (auth)/           # Clerk Auth pages
│   ├── (dashboard)/      # Financial dashboard, accounts & transaction views
│   └── api/[[...route]]/ # Hono API server implementation
├── features/             # Feature modules (accounts, categories, transactions, summary)
├── db/                   # Drizzle schema definitions & database migration files
├── hooks/                # Custom React hooks & state store
├── lib/                  # Hono RPC client & utility functions
└── scripts/              # Database seed scripts
```

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/Devmustroc">Devmustroc</a>
</p>
