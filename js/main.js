/* ==========================================================================
   main.js  -  GENERAL SITE BEHAVIOUR
   --------------------------------------------------------------------------
   Contents:
     1. Helpers
     2. Page loader
     3. Mobile menu
     4. Active link highlight
     5. Scroll progress bar + back-to-top button
     6. Custom cursor
     7. Project modal controls
     8. Contact form (validation + sending)
     9. Start-up (runs everything when the page is ready)

   Note: element ids such as `menu`, `loader` and `form` are used directly
   because browsers expose every id in the HTML as a global variable.
   ========================================================================== */


/* ---------- 1. HELPERS ---------------------------------------------------- */

// Simple email format check: something@something.something
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Shows a message under the contact form. `type` is "ok" (green) or "err" (red).
function showFormMessage(text, type) {
  formMsg.textContent = text;
  formMsg.className = type;
}


/* ---------- 2. PAGE LOADER ------------------------------------------------ */

function initLoader() {
  // Hide the loading screen shortly after everything has loaded
  addEventListener("load", () => {
    setTimeout(() => loader.classList.add("done"), 400);
  });

  // Safety net: never leave visitors stuck if a slow script delays "load"
  setTimeout(() => loader.classList.add("done"), 2500);
}


/* ---------- 3. MOBILE MENU ------------------------------------------------ */

function initMenu() {
  // Open / close the menu when the hamburger button is pressed
  menuBtn.onclick = () => {
    const isOpen = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen); // helps screen readers
  };

  // Close the menu after a link is tapped (so it does not cover the page)
  menu.querySelectorAll("a").forEach((link) => {
    link.onclick = () => {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", false);
    };
  });
}


/* ---------- 4. ACTIVE LINK HIGHLIGHT -------------------------------------- */

function initActiveLinks() {
  const links = [...menu.querySelectorAll("a")];

  // Watches which section is in the middle of the screen
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Highlight only the link whose href matches the visible section id
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // a thin band across the screen centre
  );

  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}


/* ---------- 5. SCROLL PROGRESS + BACK TO TOP ------------------------------ */

function initScrollUI() {
  addEventListener(
    "scroll",
    () => {
      const page = document.documentElement;

      // Percentage of the page scrolled -> width of the top progress bar
      const scrolled = page.scrollTop / (page.scrollHeight - page.clientHeight);
      progress.style.width = scrolled * 100 + "%";

      // Show the back-to-top button only after scrolling down a bit
      toTop.classList.toggle("show", page.scrollTop > 600);
    },
    { passive: true } // tells the browser we never block scrolling (smoother)
  );

  toTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
}


/* ---------- 6. CUSTOM CURSOR (desktop only, hidden by CSS on touch) ------- */

function initCursor() {
  addEventListener("pointermove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";

    // Grow the ring when hovering over links or buttons
    cursor.classList.toggle("big", !!e.target.closest("a, button"));
  });
}


/* ---------- 7. PROJECT MODAL CONTROLS ------------------------------------- */
/* (openModal / closeModal themselves are defined in projects.js) */

function initModal() {
  mClose.onclick = closeModal;                                    // X button

  modal.onclick = (e) => { if (e.target === modal) closeModal(); }; // click outside

  addEventListener("keydown", (e) => {                            // Esc key
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}


/* ---------- 8. CONTACT FORM ----------------------------------------------- */

// Sends the message using the provider chosen in config.js.
// Throws an error if sending fails, so the caller can show a message.
async function sendMessage(data) {

  // --- Option A: your own CRM (set contactProvider: "crm" in config.js) ---
  if (CONFIG.contactProvider === "crm") {
    const response = await fetch(CONFIG.crm.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    data.from_name,
        email:   data.reply_to,
        subject: data.subject,
        message: data.message,
        source:  CONFIG.crm.source
      })
    });

    if (!response.ok) throw new Error("CRM responded with " + response.status);
    return;
  }

  // --- Option B: EmailJS (default) ---
  const e = CONFIG.emailjs;
  await emailjs.sendForm(e.serviceId, e.templateId, form, { publicKey: e.publicKey });
}

// Returns true only if the chosen provider has its settings filled in
function isFormConfigured() {
  if (CONFIG.contactProvider === "crm") return Boolean(CONFIG.crm.endpoint);

  const e = CONFIG.emailjs;
  return Boolean(e.serviceId && e.templateId && e.publicKey);
}

function initContactForm() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // stop the browser's default page reload

    const m = CONFIG.messages;

    // Read and trim every field
    const values = Object.fromEntries(new FormData(form));
    Object.keys(values).forEach((k) => (values[k] = values[k].trim()));

    // Validation: all fields required, then email format
    if (!values.from_name || !values.reply_to || !values.subject || !values.message) {
      return showFormMessage(m.empty, "err");
    }
    if (!isValidEmail(values.reply_to)) {
      return showFormMessage(m.badEmail, "err");
    }

    // Be honest if nothing is set up yet (no fake success messages)
    if (!isFormConfigured()) {
      return showFormMessage(m.notConfigured, "err");
    }

    // Loading state: disable the button so it cannot be double-clicked
    sendBtn.disabled = true;
    sendBtn.textContent = m.sending;

    try {
      await sendMessage(values);
      showFormMessage(m.success, "ok");
      form.reset();
    } catch (error) {
      console.error(error); // visible in browser dev tools for debugging
      showFormMessage(m.failure, "err");
    }

    // Restore the button
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Message";
  });
}


/* ---------- COPY EMAIL BUTTON --------------------------------------------- */
// Copies your address to the clipboard, a reliable fallback if Gmail is blocked
function initCopyEmail() {
  copyEmail.onclick = async () => {
    try {
      await navigator.clipboard.writeText("farhanaslam4546@gmail.com");
      copyEmail.textContent = "Copied!";
    } catch (err) {
      copyEmail.textContent = "Copy failed";
    }
    setTimeout(() => (copyEmail.textContent = "Copy"), 2000);
  };
}


/* ---------- SMART EMAIL LINKS --------------------------------------------- */
// Phones (touch screens): use a mailto: link, which opens the Gmail/Mail app
// with a new message already addressed to you.
// Computers: keep the Gmail website compose link (opens in a new browser tab).
function initEmailLinks() {
  if (!matchMedia("(pointer: coarse)").matches) return; // desktop: do nothing

  document.querySelectorAll('a[href^="https://mail.google.com"]').forEach((link) => {
    link.href = "mailto:farhanaslam4546@gmail.com";
    link.removeAttribute("target"); // mailto should not open a new tab
  });
}


/* ---------- 9. START-UP --------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderAll();        // projects.js: builds skills, goals and project cards
  initScene();        // three-scene.js: starts the 3D hero
  initAnimations();   // animations.js: GSAP scroll effects

  year.textContent = new Date().getFullYear(); // footer copyright year

  initLoader();
  initMenu();
  initActiveLinks();
  initScrollUI();
  initCursor();
  initModal();
  initContactForm();
  initCopyEmail();
  initEmailLinks();
});
