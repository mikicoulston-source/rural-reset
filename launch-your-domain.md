# Rural Reset: Own-Domain Launch Plan

This version is built in code. Kit is no longer required for the landing page.

## Recommended Setup

Use Cloudflare Pages for hosting and Cloudflare D1 for the signup database.

Why:

- It is low-cost.
- It works well with a custom domain.
- The site files stay yours.
- Codex can keep editing the code.
- The signup form can save names, emails, and answers without a website builder.

## What Is Already Built

- `index.html`: Rural Reset landing page.
- `worksheet.html`: printable worksheet.
- `site.js`: handles the signup form.
- `functions/api/register.js`: saves signups.
- `schema.sql`: creates the signup database table.
- `wrangler.toml.example`: Cloudflare database binding template.

## What Still Needs Setup In Cloudflare

1. Create a Cloudflare account.
2. Add your domain to Cloudflare or connect the domain DNS.
3. Create a Cloudflare Pages project from this folder or from a GitHub repo.
4. Create a D1 database called `rural_reset`.
5. Run `schema.sql` on that database.
6. Bind the D1 database to the Pages project as `DB`.
7. Add your custom domain, for example:
   - `ruralreset.co.nz`
   - `www.ruralreset.co.nz`
   - or `yourdomain.co.nz/rural-reset`

When you know the Cloudflare D1 database ID, copy `wrangler.toml.example` to
`wrangler.toml` and replace the placeholder database ID.

## What Happens When Someone Registers

1. They enter name, email, optional answer, and consent.
2. The page sends the signup to `/api/register`.
3. The Cloudflare function validates it.
4. The signup is saved in D1.

## Later Additions

- Confirmation email after signup.
- Worksheet email delivery.
- Session reminder emails.
- Admin view to export subscribers.
- Stripe checkout for paid workshops or templates.
- A small dashboard for offers and registrations.

## Important Note

Owning the code means you avoid being locked into Kit templates.

You will still use infrastructure for hosting, email sending, and payments. That is normal. The difference is that the website and customer flow are yours.
