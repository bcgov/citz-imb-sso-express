# Protecting a Route

## Requiring a user to be logged in to use a route

Require sso authentication before using an endpoint.  
Import `protectedRoute` from `@bcgov/citz-imb-sso-express` and add as middleware to a route.

### Use Where Express app is Defined

```JavaScript
import { protectedRoute } from '@bcgov/citz-imb-sso-express';

app.use("/protected", protectedRoute(), protectedRouter); // Protected.
app.use("/unprotected", unprotectedRouter); // Not protected.
```

### Use in Router

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

---

<br />

## Requiring Roles for a Route

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

!!! note "Note
    By default, all roles in the array will be required.  
    If you wish to require only one of a list of roles, add the options parameter with `requireAllRoles` property set to `false`.

!!! tip "Tip"
    You can also check if the user has a role within the controller function by using the `hasRoles` function on the `SSOUser` object of `req.user`.
