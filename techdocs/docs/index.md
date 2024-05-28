# CITZ IMB SSO Express (NPM Package)

## Overview

This npm package offers an integration solution for Express applications requiring authentication through the B.C. government's Single Sign-On ([CSS]) service. It abstracts the complexity of handling SSO protocols manually. By using this package, developers can quickly implement authentication and authorization in their Express applications to meet B.C. government security standards.

- Built for a NodeJS:20 Express API.
- For [CSS] Gold Standard with usecase set as `Browser Login and Service Account`.
- Works with Vanilla JavaScript or TypeScript 5.
- For use with a React application using [@bcgov/citz-imb-sso-react]

<br />

!!! warning "Important"
    These packages complement, rather than replicate, Common Hosted Single Sign-On ([CSS]) or it's [example apps].  
    They allow our own applications to integrate with the Common Hosted Single Sign-On ([CSS]) Service, providing us access to it's user management capabilities.  
    They are developed and maintained by the [CITZ IMB Common Code] team, separate from the Common Hosted Single Sign-On ([CSS]) team.  
    See why we made these packages at [Purpose and Benefits of This Package](./purpose-and-benefits.md).

!!! tip "Tip"
    If you don't have an SSO integration check out [SSO Integration Settings](./getting-started/integration-settings.md).

!!! info "Info"
    You can view our [Package Management Plan] that outlines how we manage our suite of npm packages.  
    This includes topics such as versioning strategy, support lifecycle, documentation standards and more.


<!-- Link References -->
[CSS]: https://bcgov.github.io/sso-requests
[@bcgov/citz-imb-sso-react]: https://github.com/bcgov/citz-imb-sso-react
[NPM Package]: https://www.npmjs.com/package/@bcgov/citz-imb-sso-express
[example apps]: https://github.com/bcgov/keycloak-example-apps
[CITZ IMB Common Code]: mailto:citz.codemvp@gov.bc.ca?subject=SSO%20Packages%20Support
[Package Management Plan]: https://citz-imb.atlassian.net/wiki/x/EgB4CQ
