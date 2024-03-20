# BCGov SSO Integration for Express

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
[![NodeJS](https://img.shields.io/badge/Node.js_20-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](Express)

# `Introduction`

This npm package offers an integration solution for Express applications requiring authentication through the B.C. government's Single Sign-On SSO ([CSS]) service. It abstracts the complexity of handling SSO protocols manually. By using this package, developers can quickly implement authentication and authorization in their Express applications to meet B.C. government security standards.

- Built for a NodeJS:20 Express API.
- For [CSS] Gold Standard with usecase set as `Browser Login and Service Account`.
- Works with Vanilla JavaScript or TypeScript 5. [![JavaScript](https://img.shields.io/badge/-F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/) [![TypeScript](https://img.shields.io/badge/-3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)  
- For use with [@bcgov/citz-imb-sso-react]

<br />

[Documentation] - `Installation, setup and usage guides.`

<br />

> [!IMPORTANT] 
> This package does not replicate the functionality of the [CSS] service or the provided [example apps].   
> The [CITZ IMB Common Code] team created and maintains this package.  
> Read more about the [Purpose and Benefits of This Package].

<br />

#### `For Developers working on this package:`

We emphasize the inclusion of documentation on our code to enhance onboarding efficiency. Understanding the project's architecture and operational dynamics create efficient team members.

We encourage collaboration by making our project's infrastructure transparent and accessible. Enabling developers to easily navigate and contribute to different parts of the codebase without barriers. Enriching our documentation contributes to a self-documenting codebase. The project's structure and commands are defined and updated within the repository itself. Ultimately, making the project more maintainable and scalable over time.

Use the links below to help you understand the codebase better.

- [Directory Structure]
- [Scripts]
- [Publishing a New Release Version]

<br />

[Return to Top](#bcgov-sso-integration-for-express)

<!-- Link References -->
[CSS]: https://bcgov.github.io/sso-requests
[@bcgov/citz-imb-sso-react]: https://github.com/bcgov/citz-imb-sso-react
[GitHub Repository]: https://github.com/bcgov/citz-imb-sso-express
[NPM Package]: https://www.npmjs.com/package/@bcgov/citz-imb-sso-express
[example apps]: https://github.com/bcgov/keycloak-example-apps
[CITZ IMB Common Code]: mailto:citz.codemvp@gov.bc.ca?subject=SSO%20Packages%20Support
[Purpose and Benefits of This Package]: https://github.com/bcgov/citz-imb-sso-express/wiki/Purpose-and-Benefits-of-This-Package

[Documentation]: https://github.com/bcgov/citz-imb-sso-express/wiki
[Directory Structure]: https://github.com/bcgov/citz-imb-sso-express/wiki/11-Directory-Structure
[Scripts]: https://github.com/bcgov/citz-imb-sso-express/wiki/12-Scripts
[Publishing a New Release Version]: https://github.com/bcgov/citz-imb-sso-express/wiki/13-Publishing-a-New-Release-Version
