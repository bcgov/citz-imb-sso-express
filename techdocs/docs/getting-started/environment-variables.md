# Environment Variables

Ensure the following environment variables are defined on the container.

```ENV
FRONTEND_URL= # URL of the frontend application.
BACKEND_URL= # URL of the backend application.

SSO_CLIENT_ID= # SSO Integration client_id.
SSO_CLIENT_SECRET= # SSO Integration client_secret.

SSO_AUTH_SERVER_URL= # SSO Integration auth URL.
# By default, set to 'https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect'.

DEBUG= # (optional) Set to 'true' to get useful debug statements in api console.
VERBOSE_DEBUG= # (optional) Set to 'true' to get extra details from DEBUG.
COOKIE_DOMAIN= # (optional) The domain for the refresh_token cookie.
# By default, if FRONTEND_URL includes 'localhost' the value is set to 'localhost',  
# otherwise it is set to '.gov.bc.ca'.
SM_LOGOUT_URL= # (optional) Site minder logout url.
# By default, set to 'https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi'.
```

!!! tip "Tip"
    `SSO_CLIENT_ID`, `SSO_CLIENT_SECRET`, and `SSO_AUTH_SERVER_URL` details can be found in the `Technical Details` tab on your SSO integration dashboard (managed by Common Hosted Single Sign-On ([CSS]) team). 
    - resource -> SSO_CLIENT_ID,  
    - credentials.secret -> SSO_CLIENT_SECRET,  
    - auth-server-url -> SSO_AUTH_SERVER_URL  


<!-- Reference links -->

[CSS]: https://bcgov.github.io/sso-requests
