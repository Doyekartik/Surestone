// Connects this website to the EstateDesk CRM.
// Projects shown on the website come from the CRM, and enquiries / visit requests go back into the CRM as leads.
// Get these three values from the CRM: Lead sources → "Your client website" → Copy settings. Paste them over the lines below.
// Until they are filled in, the website keeps working as before (sample homes, enquiries saved only in the browser).
window.SURESTONE_CRM = {
  url: 'https://realty-crm-navy.vercel.app',
  org: 'PASTE-COMPANY-ID-HERE',
  formKey: 'PASTE-FORM-KEY-HERE'
};
