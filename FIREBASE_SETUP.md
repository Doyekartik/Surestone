# Firebase Google sign-in setup

The site now uses Firebase Authentication for Google sign-in. The Firebase project configuration is intentionally left as placeholders in `firebase-config.js`; the site cannot complete sign-in until those values are filled in and Google is enabled in the Firebase Console.

1. In Firebase Console, open your project or create one, then add a **Web app** from Project settings → General.
2. Copy the web app configuration values into `firebase-config.js` (`apiKey`, `authDomain`, `projectId`, and `appId`). These are public web app identifiers. Do not put a service account JSON or private key in this website.
3. Open Authentication → Sign-in method and enable **Google**, **Email/Password**, and **Phone**. Google is needed for Google login; Email/Password powers both email login and account creation; Phone enables SMS verification.
4. In Authentication → Settings → Authorized domains, add `localhost` for local development and the exact domain where Sure Stone will be hosted.
5. Serve the site over HTTP/HTTPS (for example, with VS Code Live Server). Opening an HTML file directly with `file://` is not a supported Firebase sign-in origin.
6. Reload the site, open **Your account**, and choose **Continue with Google**. Desktop uses a popup; mobile uses Firebase's redirect flow.

The account popup offers Google, email/password, phone/SMS login, and email account creation. Phone login asks the user to pass Firebase's reCAPTCHA and enter a six-digit SMS code. The current account center stores saved homes, preferences, and visit requests in that browser's local storage. Firebase authenticates the identity and fills in the signed-in user's name and email or phone; it does not yet synchronize those account records between devices. **Sign out clears the saved homes, profile details, home brief, and visit requests from this device.** Property listings currently use the local sample content. The CRM feed is not connected yet; its integration depends on the chosen CRM's API or export format.
