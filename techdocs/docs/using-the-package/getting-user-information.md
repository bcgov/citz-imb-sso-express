# Getting User Information

## Checking a User's Role(s)

You can check if the user has a role or roles within a controller function that is protected by the `protectedRoute` middleware function.  

```JavaScript
// ... inside controller function v

const user = req?.user;

// User must have 'Admin' role.
if (user?.hasRoles(['Admin'])) // Do something...

// Users must have BOTH 'Member' and 'Commenter' roles.
// requireAllRoles option is true by default.
if (user?.hasRoles(['Member', 'Commenter'])) // Do something...

// Users must have EITHER 'Member' or 'Verified' role.
if (user?.hasRoles(['Member', 'Verified'], { requireAllRoles: false })) // Do Something...
```

!!! note "Note"
    By default, all roles in the array will be required.  
    If you wish to require only one of a list of roles, add the options parameter with `requireAllRoles` property set to `false`.

!!! warn "Important"
    This will only work in a controller that is part of a protected route.

---

<br />

## Getting User Data

Access user information from the `user` object (of type `SSOUser`) which can be accessed from the request object (commonly `req`) of a controller function that is protected by the `protectedRoute` middleware function.

```JavaScript
const user = req?.user;
```

### Example User Object:

```JSON
{
  "guid": "W7802F34D2390EFA9E7JK15923770279",
  "preferred_username": "a7254c34i2755fea9e7ed15918356158@idir",
  "username": "JOHNDOE",
  "email": "john.doe@gov.bc.ca",
  "name": "Doe, John CITZ:EX",
  "display_name": "Doe, John CITZ:EX",
  "first_name": "John",
  "last_name": "Doe",
  "client_roles": ["Admin"],
  "scope": "openid idir email profile azureidir",
  "identity_provider": "idir",
  "originalData": { /* ... (original user data from sso) */ }
}
```

!!! note "Note"
    This user data has been normalized from the `req.user.originalData` data provided by SSO.  
    For all properties of `req.user.originalData` which is of type `OriginalSSOUser`, reference [SSO Keycloak Wiki - Identity Provider Attribute Mapping].  

<!-- Link References -->
[SSO Keycloak Wiki - Identity Provider Attribute Mapping]: https://github.com/bcgov/sso-keycloak/wiki/Identity-Provider-Attribute-Mapping
