# protectedRoute

The `protectedRoute` function is middleware for your express routes that protects the endpoint so only logged in users can use it, and can be used to require the user to have a specific role to access the endpoint.

## Import

```JavaScript
// ESModule Syntax (preferred)
import { protectedRoute } from "@bcgov/citz-imb-sso-express";

// CommonJS Syntax
const { protectedRoute } = require('@bcgov/citz-imb-sso-express');
```

## Usage

### Where Express App is Defined

A basic example of using the `protectedRoute` middleware on the express app.

```JavaScript
import express, { Application } from 'express';
import { protectedRoute } from '@bcgov/citz-imb-sso-express';

// Define Express App.
const app = express();

// Initialize SSO.
sso(app);

app.use("/protected", protectedRoute(), protectedRouter); // Protected.
app.use("/unprotected", unprotectedRouter); // Not protected.
```

### In a Router

A basic example of using the `protectedRoute` middleware on an express router.

```JavaScript
import express from "express";
const router = express.Router();
import { protectedRoute } from '@bcgov/citz-imb-sso-express';

router.get("/protected", protectedRoute(), protectedController()); // Protected.
router.get("/unprotected", unprotectedController()); // Not protected.
```

!!! warning "Warning"
    Protecting of routes with the same route string will not work. Each route string must be unique.  
    As an example `router.get("/api", unprotectedController());` and `router.get("/api", protectedRoute(), protectedController());` will not work.


### Requiring Roles for a Route

You can require that a user has a role or roles in order to use a protected route by passing an array of strings (role names) to the `protectedRoute` middleware function.

```Javascript
// Users must have 'Member' role.
app.use("/post", protectedRoute(['Member']), postRouter);

// Users must have BOTH 'Member' and 'Commenter' roles.
// requireAllRoles option is true by default.
app.use("/comment", protectedRoute(['Member', 'Commenter']), commentRouter);

// Users must have EITHER 'Member' or 'Verified' role.
app.use("/vote", protectedRoute(['Member', 'Verified'], { requireAllRoles: false }), voteRouter);
```

!!! note "Note"
    By default, all roles in the array will be required.  
    If you wish to require only one of a list of roles, add the options parameter with `requireAllRoles` property set to `false`.

!!! tip "Tip"
    You can also check if the user has a role within the controller function by using the `hasRoles` function on the `SSOUser` object of `req.user`.

## TypeScript Type

```TypeScript
(roles?: string[], options?: ProtectedRouteOptions) => RequestHandler;
```

## Parameters

An API reference for the parameters of the `protectedRoute` middleware.

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
      <td>roles</td>
      <td>string[]</td>
      <td>-</td>
      <td>Role names to require the user to have before using the endpoint.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>ProtectedRouteOptions</td>
      <td>{ requireAllRoles: true }</td>
      <td>Configurable options for the protected route.</td>
    </tr>
    <tr>
      <td>options.requireAllRoles</td>
      <td>boolean</td>
      <td>true</td>
      <td>If all roles in the `roles` array should be required.</td>
    </tr>
  </tbody>
</table>
