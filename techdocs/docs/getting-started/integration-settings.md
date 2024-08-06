# SSO Integration Settings

In order to use these packages you must first have an SSO integration from the Common Hosted Single Sign-On ([CSS]) Service.

If you're looking for the `SSO_CLIENT_ID`, `SSO_CLIENT_SECRET`, or `SSO_AUTH_SERVER_URL` values, you will find them as part of the `Technical Details` tab in your SSO integration dashboard.

## Requirements:

- The `Usecase` must be set to `Browser Login and Service Account` and client protocol set to `OpenID Connect`.
- Set the `Redirect URIs` for `Development`, and `Test` environments as the `FRONTEND_URL` and `BACKEND_URL` env values followed by `/*`.
- Set the `Redirect URIs` for `Production` environment as the `FRONTEND_URL` and `BACKEND_URL` env values  
  where `BACKEND_URL` is followed by `/auth/login/callback`  
  as well as a second `BACKEND_URL` value followed by `/auth/logout/callback`.

<!-- Link References -->

[CSS]: https://bcgov.github.io/sso-requests
