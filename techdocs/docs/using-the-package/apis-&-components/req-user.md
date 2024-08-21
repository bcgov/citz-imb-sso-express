# req.user

The `user` object is part of the `req` (Request) object when the route is protected by [protectedRoute] middleware and holds information on the user from SSO.

## Usage

A basic example of using the `protectedRoute` middleware on the express app.

```JavaScript
import { Request, Response } from 'express';

export const controller = (req: Request, res: Response) => {
  const user = req.user;

  res.send(`Hello ${user?.first_name} ${user?.last_name}!`);
};
```

## TypeScript Type

The type `SSOUser`:

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: SSOUser -->
```TypeScript
type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser;
    hasRoles: (roles: string[], options?: HasRolesOptions) => boolean;
}
```

The type `BaseSSOUser`:

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: BaseSSOUser -->
```TypeScript
type BaseSSOUser = {
    name?: string;
    preferred_username: string;
    email: string;
    display_name: string;
    client_roles?: string[];
    scope?: string;
    identity_provider: IdentityProvider;
}
```

## Properties

An API reference for the properties of the `req.user` object.

<table>
  <!-- Table columns -->
  <thead>
    <tr>
      <th style="background: #6f19d9; color: white;">Name</th>
      <th style="background: #6f19d9; color: white;">Type</th>
      <th style="background: #6f19d9; color: white;">Description</th>
    </tr>
  </thead>

  <!-- Table rows -->
  <tbody>
    <tr>
      <td>guid</td>
      <td>string</td>
      <td>Unique user identifier string.</td>
    </tr>
    <tr>
      <td>preferred_username</td>
      <td>string</td>
      <td>A combination of `guid` and `identity_provider`. This is the preferred way to reference a user as it is the most unique attribute.</td>
    </tr>
    <tr>
      <td>username</td>
      <td>string</td>
      <td>A public facing user identifier.</td>
    </tr>
    <tr>
      <td>first_name</td>
      <td>string</td>
      <td>User's given name.</td>
    </tr>
    <tr>
      <td>last_name</td>
      <td>string</td>
      <td>User's family name.</td>
    </tr>
    <tr>
      <td>display_name</td>
      <td>string</td>
      <td>User's full name and usually ministry. A good choice as a public facing user identifier.</td>
    </tr>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>User's email address.</td>
    </tr>
    <tr>
      <td>identity_provider</td>
      <td>IdentityProvider</td>
      <td>User's login identity provider such as IDIR.</td>
    </tr>
    <tr>
      <td><a href="../has-roles">hasRoles</a></td>
      <td>(roles: string[], options?: HasRolesOptions) => boolean</td>
      <td>Checks if the user has specific role(s).</td>
    </tr>
    <tr>
      <td>client_roles</td>
      <td>string[]</td>
      <td>User's roles set in SSO dashboard. Preferred you use the hasRoles function instead of checking this property.</td>
    </tr>
    <tr>
      <td>scope</td>
      <td>string</td>
      <td>Describes permissions or access levels the user has within SSO.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>Usually the same as `display_name`.</td>
    </tr>
    <tr>
      <td>originalData</td>
      <td>OriginalSSOUser</td>
      <td>The user data before it was normalized.</td>
    </tr>
  </tbody>
</table>

<!-- Link References -->
[protectedRoute]: ../protected-route
