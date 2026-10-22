# CRM Backend

Lead-management API for a course-enquiry CRM. Prospects submit enquiries through a public endpoint; employees sign in, browse the open lead pool and **claim** leads so each prospect has exactly one owner.

**Stack:** Node.js · Express · TypeScript · MongoDB (Mongoose) · Zod · express-session + connect-mongo · Helmet

## API

All routes are mounted under `/api/v1`.

| Method | Route | Auth | Purpose |
| :-- | :-- | :-- | :-- |
| `POST` | `/auth/register` | — | Create an employee account |
| `POST` | `/auth/login` | — | Start a session (cookie) |
| `POST` | `/auth/logout` | session | End the session |
| `POST` | `/enquiries` | — | Public enquiry form submission |
| `GET` | `/enquiries/public` | session | Unclaimed leads |
| `GET` | `/enquiries/my-leads` | session | Leads claimed by the current employee |
| `PATCH` | `/enquiries/:id/claim` | session | Claim a lead |

Request bodies are validated with Zod before they reach a controller; errors flow through a single error middleware as a consistent `ApiError` / `ApiResponse` shape. Sessions are stored in MongoDB.

A ready-to-import Postman collection is included: `CRM-Assignment.postman_collection.json`.

## Project structure

```
src/
  config/        env + database connection
  middlewares/   auth (session guard), validation, errors
  models/        Employee, Enquiry
  modules/
    auth/        routes → controller → service, Zod schemas
    enquiry/     routes → controller → service, Zod schemas
  utils/         ApiError, ApiResponse, bcrypt helpers
```

## Run locally

```bash
cp env.example .env   # MongoDB URI, session secret, port
npm install
npm run dev           # tsx + nodemon on src/server.ts
npm run build && npm start
```
