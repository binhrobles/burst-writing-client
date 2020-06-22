/// <reference types="react-scripts" />

interface AuthClient {
  login: Function;
  logout: Function;
  userAuthToken: gapi.auth2.AuthResponse | null;
  userDecodedToken: JWTPayload | null;
}

interface JWTPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
}
