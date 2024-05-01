# Why We Created This Package

## Overview

The [CITZ IMB Common Code] team enhances efficiency and maintainability of our React/Express applications by identifying reusable code within our products, packaging it, and adding it to the npm registry for our teams to utilize.

We created these packages to integrate with the Common Hosted Single Sign-On ([CSS]) Service provided by the Office of the Chief Information Officer.

<br />

!!! warning "Important"
    These packages complement, rather than replicate, Common Hosted Single Sign-On ([CSS]) and are an alternative to it's [example apps].  
    They allow our own applications to integrate with the Common Hosted Single Sign-On ([CSS]) Service, providing us access to it's user management capabilities.  
    They are developed and maintained by the [CITZ IMB Common Code] team, separate from the Common Hosted Single Sign-On ([CSS]) team.  

---

<br />

## Benefits of Using Our Packages for SSO Integration

To boost security, efficiency, and maintainability in our React/Express applications, we've created custom npm packages for seamless integration with the Common Hosted Single Sign-On ([CSS]) Service, leveraging its user management capabilities.

!!! note "Note"
    Our packages are intentionally designed to cater specifically to the unique requirements of our products in CITZ. We place a particular emphasis on addressing the needs of CITZ IMB products initially.

<br />

### Security and Configuration Management
IMB Developers and DevOps have decided not to use environment variables in our frontend applications for the following reasons:

- **Secure Configuration Handling**: Our approach circumvents the use of environment variables in the frontend, safeguarding against the inadvertent exposure of sensitive configuration details.  
- **Streamlined DevOps Processes**: By eliminating the complexity associated with integrating environment variables, we offer a smoother experience for our DevOps team, enhancing operational efficiency.  
- **Alternative Configuration Delivery**: Instead of using environment variables, we can securely provide configuration variables through an API endpoint if necessary.

<br />

### Streamlined Integration and Standardization
- **Uniform SSO Integration**: We ensure a consistent and standardized integration process across all applications, which simplifies the onboarding and troubleshooting process for developers.  
- **Effortless Authentication Setup**: The ease of installation our packages provide significantly reduces the time and effort required to set up authentication, avoiding the cumbersome process of manual integration.  
- **Minimized Boilerplate**: By abstracting repetitive code associated with SSO integration, our packages contribute to a cleaner and more maintainable codebase.

<br />

### Customization and Control
- **Centralized Authentication Management**: Our solutions empower us to maintain centralized control over authentication mechanisms across all projects, ensuring consistency and reliability.  
- **Independence from External Dependencies**: By minimizing our reliance on external libraries, we ensure that our applications remain agile, with the ability to quickly adapt and customize features as needed.

<br />

### Advanced Features and Capabilities
Our custom packages push the boundaries of what's possible with SSO integration:

<br />

#### For React Applications
- **Intuitive Authentication Functions**: Our login and logout functions are designed for ease of use, providing a smooth authentication experience with support for identity provider hints.  
- **Role-Based Access Utilities**: Easily check user roles within your application to manage access and permissions effectively.  
- **Enhanced User Data Handling**: Access a well-structured user data object, offering a unified schema for data from various identity providers.  
- **Simplified Protected Endpoint Integration**: Leverage simplified methods for interacting with protected endpoints, ensuring secure and efficient data access.  
- **TypeScript Support**: Enjoy the benefits of TypeScript in your React applications, with types support for improved code quality and maintainability.  
- **Seamless Token Management**: Automatic token refresh mechanisms and intuitive re-login prompts enhance the user experience and maintain session continuity.

<br />

#### For Express Applications
- **Effortless Express Integration**: Our package is designed for seamless compatibility with Express applications, ensuring a straightforward setup process.  
- **Enhanced Authentication Events**: Gain additional control over the authentication flow with options for customizing post-login and logout events.  
- **Secure Route Protection**: Easily secure routes with robust authentication and authorization checks, safeguarding your application's critical resources.  
- **Role-Based Access Utilities**: Utilize convenient utilities for role checking, enabling granular access control within your Express applications.  
- **Enhanced User Data Handling**: Access a well-structured user data object, offering a unified schema for data from various identity providers.  
- **TypeScript Support**: Enjoy the benefits of TypeScript in your Express applications, with types support for improved code quality and maintainability.

<br /><br />

By adopting our custom npm packages for SSO integration, we're leveraging the unique advantages they bring to our React/Express applications. This approach allows us to harness a solution that is not only secure and efficient but also thoughtfully tailored to complement the specific needs and objectives of our projects.

<!-- Reference links -->

[CSS]: https://bcgov.github.io/sso-requests
[example apps]: https://github.com/bcgov/keycloak-example-apps
[CITZ IMB Common Code]: mailto:citz.codemvp@gov.bc.ca?subject=SSO%20Packages%20Support
