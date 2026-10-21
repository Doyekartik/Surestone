# The Astittva Estates ↔ EstateDesk CRM

What changed:
- Homes on the site now come from the CRM's Projects. Add, edit or hide a project in the CRM and the site updates within about a minute. Sold-out projects are left out.
- "Contact seller", "Schedule a visit" and "Sell with us" now send the person straight into the CRM as a lead (with the project name). A wrong mobile number shows an error on the form.
- The visit form now asks for name and phone (it had no way to reach the person before).
- Until crm-config.js is filled in, the site works exactly as before.

Files changed: app.js, styles.css, all 7 .html files (one script line + name/phone on the visit form). New: crm-config.js.

Setup (5 minutes):
1. In the CRM: Lead sources → add a source, type "Website", name it "Surestone website".
2. In the CRM: Lead sources → "Your client website" → Copy settings.
3. Paste over the contents of crm-config.js, commit, push. Vercel redeploys.
4. Open the site: you should see the CRM's projects. Send a test enquiry with your own number; it appears in the CRM under Leads.

Your old Supabase table (supabase-config.js, properties) is no longer used once crm-config.js is filled in. You can leave it.
