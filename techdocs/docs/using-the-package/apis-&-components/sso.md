# sso

The `sso` function initializes the sso service in your express app.

## Import

```JavaScript
// ESModule Syntax (preferred)
import { sso } from "@bcgov/citz-imb-sso-express";

// CommonJS Syntax
const { sso } = require('@bcgov/citz-imb-sso-express');
```

## Usage

A basic example of using the `sso` function to initialize the SSO service.

```JavaScript
import express, { Application } from 'express';
import { sso } from '@bcgov/citz-imb-sso-express';

// Define Express App.
const app = express();

// Initialize sso(app: Application, options?: SSOOptions).
sso(app);
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
