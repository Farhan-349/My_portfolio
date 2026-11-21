/* ==========================================================================
   config.js  -  ALL SETTINGS LIVE HERE
   --------------------------------------------------------------------------
   Change values in this one file instead of hunting through the code.
   Nothing secret belongs here: this file is public once the site is online.
   ========================================================================== */

const CONFIG = {

  /* ------------------------------------------------------------------------
     CONTACT FORM PROVIDER
     "emailjs" -> messages are emailed to you through EmailJS (default)
     "crm"     -> messages are sent to your own CRM API (use this later)
     ------------------------------------------------------------------------ */
  contactProvider: "emailjs",


  /* ------------------------------------------------------------------------
     EMAILJS SETTINGS (get these from your emailjs.com dashboard)
     Leave empty until you have them. The form will then politely tell
     visitors it is not configured, instead of pretending to send.
     ------------------------------------------------------------------------ */
  emailjs: {
    serviceId:  "",
    templateId: "",
    publicKey:  ""   // EmailJS public keys are designed to be public
  },


  /* ------------------------------------------------------------------------
     CRM SETTINGS (for the CRM you plan to build later)
     endpoint: the URL of your CRM's "create lead" API, for example
               "https://your-crm.example.com/api/leads"
     Your CRM must accept a JSON POST with these fields:
               name, email, subject, message, source
     NEVER put a secret API key here, because visitors can read this file.
     Protect the endpoint on the server side instead (rate limits, CORS).
     ------------------------------------------------------------------------ */
  crm: {
    endpoint: "",
    source:   "portfolio-website"   // tells your CRM where the lead came from
  },


  /* ------------------------------------------------------------------------
     TEXT SHOWN TO VISITORS (easy to translate or reword)
     ------------------------------------------------------------------------ */
  messages: {
    empty:         "Please fill in all fields.",
    badEmail:      "Please enter a valid email address.",
    notConfigured: "The contact form is not configured yet. Please email me directly at farhanaslam4546@gmail.com.",
    sending:       "Sending...",
    success:       "Message sent. Thank you!",
    failure:       "Sorry, the message could not be sent. Please email me directly."
  }
};
