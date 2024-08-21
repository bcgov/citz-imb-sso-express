# TypeScript Types

These are the complete TypeScript types available within the package as they are in the bundled build.

For more in depth documentation on types, look at the `APIs & Components` pages.

<!-- DO NOT REMOVE THE FOLLOWING LINES. -->
<!-- This code block is auto generated when types in the package change. -->

<!-- TYPESCRIPT TYPES -->
```TypeScript
import { RequestHandler, Application, Request, Response } from 'express';

type HasRolesOptions = {
    requireAllRoles?: boolean;
};
type IdirIdentityProvider = 'idir';
type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
type IdentityProvider = IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
type BaseSSOUser = {
    name?: string;
    preferred_username: string;
    email: string;
    display_name: string;
    client_roles?: string[];
    scope?: string;
    identity_provider: IdentityProvider;
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
type OriginalSSOUser = BaseSSOUser & SSOIdirUser & SSOBCeIDUser & SSOGithubUser;
type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser;
    hasRoles: (roles: string[], options?: HasRolesOptions) => boolean;
};
type SSOOptions = {
    afterUserLogin?: (user: SSOUser) => Promise<void> | void;
    afterUserLogout?: (user: SSOUser) => Promise<void> | void;
};
type ProtectedRouteOptions = {
    requireAllRoles?: boolean;
};
declare global {
    namespace Express {
        interface Request {
            token?: string;
            user?: SSOUser;
        }
    }
}

declare const protectedRoute: (roles?: string[], options?: ProtectedRouteOptions) => RequestHandler;

declare const getUserInfo: (access_token: string) => SSOUser | null;
declare const hasAllRoles: (userRoles: string[], requiredRoles: string[]) => boolean;
declare const hasAtLeastOneRole: (userRoles: string[], requiredRoles: string[]) => boolean;
declare const hasRoles: (user: SSOUser, roles: string[], options?: HasRolesOptions) => boolean;
declare const normalizeUser: (userInfo: OriginalSSOUser | null) => SSOUser | null;

declare const sso: (app: Application, options?: SSOOptions) => void;

declare const login: (options?: SSOOptions) => (req: Request, res: Response) => Promise<void>;

declare const loginCallback: (options?: SSOOptions) => (req: Request, res: Response) => Promise<void>;

declare const logout: (options?: SSOOptions) => (req: Request, res: Response) => Promise<void>;

declare const logoutCallback: (options?: SSOOptions) => (req: Request, res: Response) => Promise<void>;

declare const refreshToken: (options?: SSOOptions) => (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;

declare const getLoginURL: (kc_idp_hint?: IdentityProvider) => string;
declare const getLogoutURL: (id_token: string) => string;

declare const checkForUpdates: () => Promise<void>;

declare const _default: {
    controllerCalled: (controllerName: string) => void;
    controllerError: (controllerName: string, error: unknown) => void;
    afterUserLogout: (user: SSOUser | null) => void;
    afterUserLogin: (user: SSOUser | null) => void;
    initialized: () => void;
    unauthorizedTokenError: (refresh_token: string) => void;
    loginURL: (url: string) => void;
    logoutURL: (url: string) => void;
    loginCallbackRedirectURL: (url: string) => void;
    logQueryParams: (controllerName: string, query: unknown) => void;
    getTokensResponse: (response: unknown) => void;
};

declare namespace debug_d {
  export { _default as default };
}

declare const encodeJWT: (jwt: string) => string;
declare const decodeJWT: (jwt: string) => any;
declare const parseJWT: (jwt: string) => {
    header: any;
    payload: any;
} | null;

declare const getTokens: (code: string) => Promise<{
    id_token: any;
    access_token: any;
    refresh_token: any;
    refresh_expires_in: any;
}>;
declare const isJWTValid: (jwt: string) => Promise<any>;
declare const getNewTokens: (refresh_token: string) => Promise<null | {
    access_token: string;
    id_token: string;
    expires_in: number;
}>;

export { type BaseSSOUser, type BceidIdentityProvider, type GithubIdentityProvider, type HasRolesOptions, type IdentityProvider, type IdirIdentityProvider, type OriginalSSOUser, type ProtectedRouteOptions, type SSOBCeIDUser, type SSOGithubUser, type SSOIdirUser, type SSOOptions, type SSOUser, checkForUpdates, debug_d as debug, decodeJWT, encodeJWT, getLoginURL, getLogoutURL, getNewTokens, getTokens, getUserInfo, hasAllRoles, hasAtLeastOneRole, hasRoles, isJWTValid, login, loginCallback, logout, logoutCallback, normalizeUser, parseJWT, protectedRoute, refreshToken, sso };
```
