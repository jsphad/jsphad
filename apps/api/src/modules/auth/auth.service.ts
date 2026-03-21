import type { LoginInput, SignUpInput } from './auth.schemas.js';

export class AuthService {
  async signUp(input: SignUpInput) {
    return {
      userId: 'demo-user-id',
      email: input.email,
      displayName: input.displayName,
      token: 'replace-with-jwt'
    };
  }

  async login(input: LoginInput) {
    return {
      userId: 'demo-user-id',
      email: input.email,
      token: `mock-token-for-${input.email}`
    };
  }
}
