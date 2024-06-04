# sso

The `sso` function initializes the SSO service in your express app.

## Import

```JavaScript
// ESModule Syntax (preferred)
import { sso } from "@bcgov/citz-imb-sso-express";

// CommonJS Syntax
const { sso } = require('@bcgov/citz-imb-sso-express');
```

## Usage

A basic example of using the `sso` function to initialize the SSO service with SSOOptions.

```JavaScript
import express, { Application } from 'express';
import { sso } from '@bcgov/citz-imb-sso-express';
import { activateUser } from "./utils";

// Define Express App.
const app = express();

const SSO_OPTIONS: SSOOptions = {
  afterUserLogin: (user: SSOUser) => {
    if (user) activateUser(user); // Demonstration of passing user info to a custom function.
  },
  afterUserLogout: (user: SSOUser) => {
    console.log(`${user?.display_name ?? "Unknown"} has logged out.`);
  },
};

// Initialize sso(app: Application, options?: SSOOptions).
sso(app, SSO_OPTIONS);
```

## TypeScript Type

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: sso -->
```TypeScript
const sso: (app: Application, options?: SSOOptions) => void;
```

Type of `SSOOptions`:

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: SSOOptions -->
```TypeScript
type SSOOptions = {
    afterUserLogin?: (user: SSOUser) => Promise<void> | void;
    afterUserLogout?: (user: SSOUser) => Promise<void> | void;
}
```

## Parameters

An API reference for the parameters of the `sso` function.

The Name column starting with `*` means the prop is required.

<table>
  <!-- Table columns -->
  <thead>
    <tr>
      <th style="background: #6f19d9; color: white;">Name</th>
      <th style="background: #6f19d9; color: white;">Type</th>
      <th style="background: #6f19d9; color: white;">Default</th>
      <th style="background: #6f19d9; color: white;">Description</th>
    </tr>
  </thead>

  <!-- Table rows -->
  <tbody>
    <tr>
      <td>* app</td>
      <td>Application (from express)</td>
      <td>-</td>
      <td>The express application.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>SSOOptions</td>
      <td>-</td>
      <td>Configurable options for the SSO service.</td>
    </tr>
    <tr>
      <td>options.afterUserLogin</td>
      <td>(user: SSOUser) => void</td>
      <td>-</td>
      <td>Function to run after the user logs in.</td>
    </tr>
    <tr>
      <td>options.afterUserLogout</td>
      <td>(user: SSOUser) => void</td>
      <td>-</td>
      <td>Function to run after the user logs out.</td>
    </tr>
  </tbody>
</table>
