# Expense Tracker - Placement Assignment

This is a full-stack Expense Tracker web application I built as my placement assignment project (7th Semester). It helps users log their daily expenses, categorize them, and see a summary of where their money is going. 

I decided to build this using a React + Express stack instead of just plain HTML/JS to show that I understand modern component-based architecture and API integration.

## Tech Stack Used
* **Frontend**: React.js (built with Vite for faster compilation)
* **Styling**: Tailwind CSS mixed with some custom vanilla CSS (to show I know both utility classes and raw CSS animations)
* **Backend**: Node.js & Express.js
* **Database**: PostgreSQL (hosted on Supabase)
* **Deployment**: Vercel (Using a custom monorepo build script)

## Features
* Log new expenses with Amount, Category (Food, Travel, Bills, Other), and Date.
* Dynamic dashboard that calculates total spending per category.
* Filter expenses by category or specific dates.
* Everything updates in real-time without reloading the page.
* Connected to a live Postgres database so data actually persists.

