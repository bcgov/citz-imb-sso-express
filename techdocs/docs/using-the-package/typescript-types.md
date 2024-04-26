# TypeScript Types

These are the TypeScript types available within the package.

```TypeScript
// Application and RequestHandler are types provided by 'express'

declare const sso: (app: Application, options?: SSOOptions) => void;

declare const protectedRoute: (roles?: string[], options?: ProtectedRouteOptions) => RequestHandler;

declare const hasRoles: (user: SSOUser, roles: string[], options?: HasRolesOptions) => boolean;

type IdirIdentityProvider = 'idir';
type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
type IdentityProvider = IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;

type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser;
    hasRoles: (roles: string[], options?: HasRolesOptions) => boolean;
};

type OriginalSSOUser = BaseSSOUser & SSOIdirUser & SSOBCeIDUser & SSOGithubUser;

type BaseSSOUser = {
    name?: string;
    preferred_username: string;
    email: string;
    display_name: string;
    client_roles?: string[];
    scope?: string;
    identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
};

type SSOIdirUser = {
    idir_user_guid?: string;
    idir_username?: string;
    given_name?: string;
    family_name?: string;
};

type SSOBCeIDUser = {
    bceid_user_guid?: string;
    bceid_username?: string;
    bceid_business_name?: string;
};

type SSOGithubUser = {
    github_id?: string;
    github_username?: string;
    orgs?: string;
    given_name?: string;
    family_name?: string;
    first_name?: string;
    last_name?: string;
};

type SSOOptions = {
    afterUserLogin?: (user: SSOUser) => Promise<void> | void;
    afterUserLogout?: (user: SSOUser) => Promise<void> | void;
};

type ProtectedRouteOptions = {
    requireAllRoles?: boolean;
};

type HasRolesOptions = {
    requireAllRoles?: boolean;
};

// Adding properties to the Request object from 'express'
declare global {
    namespace Express {
        interface Request {
            token?: string;
            user?: SSOUser;
        }
    }
}
```
