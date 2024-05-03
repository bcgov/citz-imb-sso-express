# Troubleshooting

Sometimes issues may arise when using the packages for the first time, or when updating to a new version. Use this guide to help troubleshoot the problem.

## Initial Setup Checklist

1. Ensure you follow the Quick Start Guides closely for each package.

  - [SSO React - Quick Start Guide](https://dev.developer.gov.bc.ca/docs/default/component/citz-imb-sso-react-npm-package/getting-started/quick-start-guide/)
  - [SSO Express - Quick Start Guide](../getting-started/quick-start-guide.md)

2. Ensure environment variables are properly configured in the container running your `citz-imb-sso-express` package. Keep in mind that `SSO_CLIENT_SECRET` and `SSO_AUTH_SERVER_URL` are different between each SSO environment (Development, Test, Production).

3. Ensure your SSO Integration is set up properly. This includes the `Usecase` being set to `Browser Login and Service Account`, and the `Redirect URIs` being properly configured for each SSO environment (Development, Test, Production). For more information, visit [SSO Integration Settings](../getting-started/sso-integration-settings.md).

<br />

## Diagnosing the Problem

If an issue persists after following all the proper setup guides, follow these steps to help find the problem.

1. In this package, you can get more detailed console logs by setting `DEBUG` and `VERBOSE_DEBUG` environment variables to `true`. These logs may help you spot an issue such as a null or undefined value.

2. For the `citz-imb-sso-react` package you can check the Application cookies and Network tab in your browser's dev tools to help diagnose the problem.

  - If you see an undefined `refresh_token` cookie, there is a problem somewhere in the backend. Make sure all environment variables are correct.
  - In the Network tab you will see a chain of login requests and a `?refresh_expires_in=1799&post_login_redirect_url=` request. If `refresh_expires_in` is `undefined` there is a problem somewhere in the backend. Make sure all environment variables are correct.
  - In the Network tab, `https://logontest7.gov.bc.ca/clp-cgi/accessDenied.cgi` should be expected and will not cause issues with the login process.
  - In the Network tab, you should also see a `token` request. This is the final step in the login process where token details are retrieved and stored in React useContext state. This will run every page refresh.

If you can't resolve the problem yourself, open a [Bug Report](https://github.com/bcgov/citz-imb-sso-express/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=Bug%3A+) and mention any issues you've found in your troubleshooting.

<br />

## Common Issues

### Login Doesn't Work in ________ OpenShift Environment

Each SSO Environment has it's own `SSO_CLIENT_SECRET` and `SSO_AUTH_SERVER_URL` environment variables. If login works locally and in your DEV environment but not in TEST or PROD, it's likely that one of these values is incorrect.
