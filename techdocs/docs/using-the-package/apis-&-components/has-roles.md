# hasRoles Action 

The `hasRoles` function is part of the [req.user] object and is used to check if the logged in user has specific role(s).

## Usage

A basic example of using the `hasRoles` function to create a different message based on the user's roles.

```JavaScript
import { Request, Response } from 'express';

const RoleMessage = (user: SSOUser) => {
  // User must have 'Admin' role.
  if (user?.hasRoles(['Admin'])) 
    return 'Admins have access to moderation features.';

  // Users must have BOTH 'Member' and 'VIP' roles.
  // requireAllRoles option is true by default.
  if (user?.hasRoles(['Member', 'VIP'])) 
    return 'VIPs have access to more features.';

  // Users must have EITHER 'Member' or 'Verified' role.
  if (user?.hasRoles(['Member', 'Verified'], { requireAllRoles: false })) 
    return 'Verified users have access to the application.';

  return 'Verify your account to get access to the application.';
}

export const controller = (req: Request, res: Response) => {
  const user = req.user;

  res.send(roleMessage(user));
};
```

!!! note "Note"
    By default, all roles in the array will be required.  
    If you wish to require only one of a list of roles, add the options parameter with `requireAllRoles` property set to `false`.

## Parameters

An API reference for the parameters of the `hasRoles` function.

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
      <td>* roles</td>
      <td>string[]</td>
      <td>-</td>
      <td>The role names to check if the user has.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>HasRolesOptions</td>
      <td>{ requireAllRoles: true }</td>
      <td>Configurable options for the `hasRoles` function.</td>
    </tr>
    <tr>
      <td>options.requireAllRoles</td>
      <td>boolean</td>
      <td>true</td>
      <td>If all roles in the `roles` array should be required or if only a single role is required.</td>
    </tr>
  </tbody>
</table>

<!-- Link References -->
[req.user]: ../req-user
