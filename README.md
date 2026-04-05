# Finance Dashboard UI

This project was built as part of a frontend internship screening assignment.

The goal was to create a clean and interactive finance dashboard where users can quickly understand their financial activity through summaries, charts, transactions, and simple insights.

I mainly focused on keeping the UI simple, easy to use, and visually clean while covering all the required features.

---

## What’s Included

* Summary cards for total balance, income, and expenses
* Monthly balance trend chart
* Spending category breakdown chart
* Transactions table with search, filter, and sorting
* Viewer/Admin role switch for frontend-only RBAC simulation
* Insights section with spending observations
* Dark mode support
* CSV export
* LocalStorage persistence
* Responsive design for desktop and mobile
* Empty state handling

---

## My Approach

I divided the dashboard into reusable sections like cards, charts, transactions, and insights so the code stays clean and easier to maintain.

For role-based UI, I used a simple dropdown to switch between **Viewer** and **Admin** roles:

* Viewer can only view data
* Admin can add, edit, and delete transactions

I used mock transaction data and managed the UI state using React state hooks.

I also added localStorage so the selected role and transactions stay saved even after refresh.

The main focus was:

* clean layout
* easy navigation
* responsive design
* simple but useful insights
* readable component structure

---

## Tech Stack

* React
* TypeScript
* Tailwind CSS
* Recharts
* React Router
* LocalStorage

---

## Run Locally

```bash
npm install
npm run dev
```

---

## Links

Live Demo: YOUR_VERCEL_LINK

GitHub Repository: YOUR_GITHUB_LINK
