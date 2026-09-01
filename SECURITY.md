# SECURITY & SANITIZATION POLICY

This document outlines the security architecture protecting the `/admin` CMS and public portfolio routes.

---

## 1. Authentication & Route Protection

- **Protected Routes**: All `/admin/*` routes (except `/admin/login`) are wrapped with [`ProtectedRoute.tsx`](file:///e:/portfolio/src/components/common/ProtectedRoute.tsx).
- **Session Validation**: Managed by [`AuthContext.tsx`](file:///e:/portfolio/src/context/AuthContext.tsx). Unauthenticated access attempts automatically redirect to `/admin/login`.
- **No Credentials in Frontend**: Environment variables and server-side secret rules apply for production deployments.

---

## 2. Search Engine Indexing Protection

- Search engine crawlers are explicitly instructed to ignore admin routes using `<meta name="robots" content="noindex, nofollow">` on administrative pages.

---

## 3. Data Sanitization & Input Rules

- All user inputs in CMS form fields are sanitized and stored as plain strings.
- Untrusted HTML execution via `dangerouslySetInnerHTML` is disabled.
- File uploads enforce mime-type and file-extension verification.
