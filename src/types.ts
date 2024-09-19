/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-unused-vars */

export type HasRolesOptions = {
  requireAllRoles?: boolean;
};

export type IdirIdentityProvider = 'idir' | 'azureidir';
export type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
export type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
// BC Services Card uses SSO_CLIENT_ID as the provider.

export type IdentityProvider = 
  | IdirIdentityProvider
  | BceidIdentityProvider
  | GithubIdentityProvider;

export type BaseSSOUser = {
  name?: string;
  preferred_username: string;
  email: string;
  display_name: string;
  client_roles?: string[];
  scope?: string;
  identity_provider: IdentityProvider;
};

export type SSOIdirUser = {
  idir_user_guid?: string;
  idir_username?: string;
  given_name?: string;
  family_name?: string;
};

export type SSOBCeIDUser = {
  bceid_user_guid?: string;
  bceid_username?: string;
  bceid_business_name?: string;
};

export type SSOGithubUser = {
  github_id?: string;
  github_username?: string;
  orgs?: string;
  given_name?: string;
  family_name?: string;
  first_name?: string;
  last_name?: string;
};

export type SSOBcServicesCardUser = {
  given_name?: string;
  family_name?: string;
}

export type OriginalSSOUser = 
  & BaseSSOUser 
  & SSOIdirUser 
  & SSOBCeIDUser 
  & SSOGithubUser 
  & SSOBcServicesCardUser;

export type SSOUser = BaseSSOUser & {
  guid: string;
  username: string;
  first_name: string;
  last_name: string;
  originalData: OriginalSSOUser;
  hasRoles: (roles: string[], options?: HasRolesOptions) => boolean;
};

export type SSOOptions = {
  afterUserLogin?: (user: SSOUser) => Promise<void> | void;
  afterUserLogout?: (user: SSOUser) => Promise<void> | void;
};

export type ProtectedRouteOptions = {
  requireAllRoles?: boolean;
};

// The token and user properties are not a part of the Request object by default.
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: SSOUser;
    }
  }
}
