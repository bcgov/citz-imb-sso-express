# Major Release 1.0.0

!!! info
    The Major Releases pages are here to describe what the major releases of this package are for, what they offer, their dependencies, and how to upgrade from the previous version.

Release 1.0.0 is the first stable release of the package. It offers an integration solution for Express applications requiring authentication through the B.C. government's Single Sign-On ([CSS]) service. It abstracts the complexity of handling SSO protocols manually. By using this package, developers can quickly implement authentication and authorization in their Express applications to meet B.C. government security standards.

## Dependencies

- NodeJS 20
- Express 4
- `@bcgov/citz-imb-sso-react` 1.x.x

## Features

- Protect endpoints behind authentication.
- Protected endpoints and functionality by user role.
- Get user information from logged in user.
- Execute functions on user login and logout.
- Type safety.

<!-- Link References -->
[CSS]: https://bcgov.github.io/sso-requests
