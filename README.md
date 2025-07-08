# JavaScript Security Demo

## 🎯 Goal

This project demonstrates common web security vulnerabilities such as **SQL Injection** and **Cross-Site Scripting (XSS)**.  
It allows users to explore these flaws practically and learn how to fix them.

---

## 🗂️ Project Structure

```

├── package.json
├── package-lock.json
├── src
│   ├── database.ts
│   ├── index.ts
│   └── underTest.ts
└── tsconfig.json

````

---

## ⚙️ Setup

### Prerequisites

- Node.js **v18+**

### Install dependencies

```bash
npm install
````

---

## 🚀 Run

```bash
npx tsx src/index.ts
```

After running, access the application in your browser at:
```
http://localhost:3000
```

---

## 📦 Key packages used

* **express** — minimalist web framework for Node.js
* **typescript** — type-safe JavaScript superset
* **tsx** — execute TypeScript files directly
* **sqlite3** — lightweight SQL database engine
* **@types/node**, **@types/express**, **@types/escape-html** — TypeScript type definitions

---

## 🛡️ Learn and fix

Check the code in `src/underTest.ts` to identify the vulnerabilities.
Try fixing them to improve your understanding of secure coding practices.

---
