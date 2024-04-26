# Initialization Options

Add additional functionality to your SSO integration by using the optional second parameter to the `sso()` function which is of type `SSOOptions`.  
Currently `afterUserLogin` and `afterUserLogout` are available to configure. 

### Example:

```JavaScript
import { SSOOptions, SSOUser, sso } from "@bcgov/citz-imb-sso-express";
import { activateUser } from "./utils";

const SSO_OPTIONS: SSOOptions = {
  afterUserLogin: (user: SSOUser) => {
    if (user) activateUser(user); // Demonstration of passing user info to a custom function.
  },
  afterUserLogout: (user: SSOUser) => {
    console.log(`${user?.display_name ?? "Unknown"} has logged out.`);
  },
};

// Initialize sso in file that defines express app:
sso(app, SSO_OPTIONS);
```

!!! tip "Tip"
    Use this to add a user to your database upon first login and then update fields such as last login upon subsequent logins.
