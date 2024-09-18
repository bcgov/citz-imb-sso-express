# Module Exports

These are the functions and types exported by the package.

```JavaScript
import {
  sso, // Initializes the sso service in your express app.
  protectedRoute, // Middleware function used for authentication and authorization.
} from '@bcgov/citz-imb-sso-express';

// TypeScript Types:
import {
  SSOUser, // Normalized user type for req.user
  OriginalSSOUser, // All user properties from sso
  SSOIdirUser, // User types specific to Idir users.
  SSOBCeIDUser, // User types specific to BCeID users.
  SSOGithubUser, // User types specific to Github users.
  SSOBcServicesCardUser, // User types specific to BC Services Card users.
  SSOOptions, // Type of optional second parameter for sso()
  ProtectedRouteOptions, // Type of optional second parameter for protectedRoute()
  HasRolesOptions, // Type of optional second parameter for req?.user?.hasRoles()
  IdentityProvider, // Combined type for identity providers.
  IdirIdentityProvider, // Used for more efficient login.
  AzureIdirIdentityProvider, // Used for more efficient login.
  BceidIdentityProvider, // Used for more efficient login.
  GithubIdentityProvider, // Used for more efficient login.
  // BC Services Card has no fixed identity provider. It uses SSO_CLIENT_ID.
} from '@bcgov/citz-imb-sso-express';
```
