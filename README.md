# BCGov SSO Integration for Express

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
[![NodeJS](https://img.shields.io/badge/Node.js_20-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](Express)

# `Introduction`

This npm package offers an integration solution for connecting Express applications requiring authentication to the B.C. government's Single Sign-On ([CSS]) service. It abstracts the complexity of handling SSO protocols manually. By using this package, developers can quickly implement authentication and authorization in their Express applications to meet B.C. government security standards.

- Built for a NodeJS:20 Express API.
- For [CSS] Gold Standard with usecase set as `Browser Login and Service Account`.
- Works with Vanilla JavaScript or TypeScript 5. [![JavaScript](https://img.shields.io/badge/-F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/) [![TypeScript](https://img.shields.io/badge/-3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)  
- For use with a React app using [@bcgov/citz-imb-sso-react]

<br />

[![GitHub release](https://img.shields.io/github/v/release/bcgov/citz-imb-sso-express.svg)](https://GitHub.com/bcgov/citz-imb-sso-express/releases/)  
[![Npm package total downloads](https://badgen.net/npm/dt/@bcgov/citz-imb-sso-express)](https://www.npmjs.com/package/@bcgov/citz-imb-sso-express)  
[![GitHub stars](https://img.shields.io/github/stars/bcgov/citz-imb-sso-express.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/bcgov/citz-imb-sso-express/stargazers/)  

### `Get Started Here!`

[Documentation] - `Installation, setup and usage guides.`

<br />

> ### `IMPORTANT`
> These packages complement, rather than replicate, Common Hosted Single Sign-On ([CSS]) or it's [example apps].  
> They allow our own applications to integrate with the Common Hosted Single Sign-On ([CSS]) Service, providing us access to it's user management capabilities.  
> They are developed and maintained by the [CITZ IMB Common Code] team, separate from the Common Hosted Single Sign-On ([CSS]) team.  
> See why we made these packages at [Purpose and Benefits of This Package].

<br />

#### `For Developers working on this package:`

We emphasize the inclusion of documentation on our code to enhance onboarding efficiency. Understanding the project's architecture and operational dynamics create efficient team members.

We encourage collaboration by making our project's infrastructure transparent and accessible. Enabling developers to easily navigate and contribute to different parts of the codebase without barriers. Enriching our documentation contributes to a self-documenting codebase. The project's structure and commands are defined and updated within the repository itself. Ultimately, making the project more maintainable and scalable over time.

Use the links below to help you understand the codebase better.

- [Directory Structure]
- [Scripts]
- [Package Management Plan]
- [Publishing a New Release Version]

<br />

[Return to Top](#bcgov-sso-integration-for-express)

<!-- Link References -->
[CSS]: https://bcgov.github.io/sso-requests
[@bcgov/citz-imb-sso-react]: https://github.com/bcgov/citz-imb-sso-react
[NPM Package]: https://www.npmjs.com/package/@bcgov/citz-imb-sso-express
[example apps]: https://github.com/bcgov/keycloak-example-apps
[CITZ IMB Common Code]: mailto:citz.codemvp@gov.bc.ca?subject=SSO%20Packages%20Support
[Purpose and Benefits of This Package]: https://developer.gov.bc.ca/docs/default/component/citz-imb-sso-express-npm-package/purpose-and-benefits/

[Documentation]: https://developer.gov.bc.ca/docs/default/component/citz-imb-sso-express-npm-package
[Directory Structure]: https://github.com/bcgov/citz-imb-sso-express/wiki/Directory-Structure
[Scripts]: https://github.com/bcgov/citz-imb-sso-express/wiki/Scripts
[Publishing a New Release Version]: https://citz-imb.atlassian.net/l/cp/rj2F0y2n
[Package Management Plan]: https://citz-imb.atlassian.net/l/cp/jcxjEmBf
