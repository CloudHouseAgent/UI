export {};

declare global {
  interface CustomJwtSessionClaims {
    email: string;
    picture: string;
    fullName: string;
    phoneNumber: string;
  }
}
