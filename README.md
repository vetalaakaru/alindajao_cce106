 1. Why is SecureStore better than plain-text storage?
   Plain-text storage is unencrypted and easily stolen on rooted or hacked devices. SecureStore encrypts the token using native device hardware security (iOS Keychain / Android KeyStore).
 2. What is the purpose of the Authorization header?
   It safely sends the access token (Bearer <token>) to the API so the server knows who is making the request without needing a password every time.
 3. What should the app do when a stored token is expired or rejected?
   Delete the invalid token from SecureStore, clear the profile data, and return to the login screen with a session expired message.

