# M Farhan Aslam Portfolio

## 1. Add your CV
Place your real PDF at `assets/M-Farhan-Aslam-CV.pdf` (exact name). View/Download buttons point there. It is NOT included, so they will 404 until you add it.

## 2. Run locally
VS Code > install "Live Server" > right-click `index.html` > Open with Live Server.

## 3. Contact form (EmailJS)
1. Sign up at emailjs.com, add an Email Service (Gmail) and a Template using variables `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`.
2. Copy Service ID, Template ID and Public Key into `js/config.js`. (Public key is designed to be public; never put a private key in the code.)
3. Until filled in, the form honestly tells visitors it is not configured.

## 4. Deploy
- GitHub: create a repo, then `git init`, `git add .`, `git commit -m "Portfolio"`, `git remote add origin <your repo url>`, `git push -u origin main`.
- Netlify: Add new site > Import from GitHub (or drag the folder), no build command, publish directory `.`.
- Vercel: Import the repo, framework "Other", deploy.

## 5. Customise
Edit projects, skills and goals in `js/projects.js`. Add real GitHub/Live links to a project only when they exist.

## 6. Connecting your future CRM
In `js/config.js` set `contactProvider: "crm"` and put your CRM's create-lead URL in `crm.endpoint`. The form then POSTs JSON (name, email, subject, message, source) to it. Never put secret keys in this file.
