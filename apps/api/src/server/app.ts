import { AuthService } from '../modules/auth/auth.service.js';
import { loginSchema, signUpSchema } from '../modules/auth/auth.schemas.js';
import { ProfileService } from '../modules/profile/profile.service.js';
import { updateProfileSchema } from '../modules/profile/profile.schemas.js';

const authService = new AuthService();
const profileService = new ProfileService();

export async function handleRequest(request: Request) {
  const url = new URL(request.url);

  if (request.method === 'GET' && url.pathname === '/health') {
    return Response.json({ status: 'ok' });
  }

  if (request.method === 'POST' && url.pathname === '/auth/signup') {
    const body = signUpSchema.parse(await request.json());
    return Response.json(await authService.signUp(body), { status: 201 });
  }

  if (request.method === 'POST' && url.pathname === '/auth/login') {
    const body = loginSchema.parse(await request.json());
    return Response.json(await authService.login(body));
  }

  if (request.method === 'GET' && url.pathname === '/profile') {
    return Response.json(await profileService.getProfile('demo-user-id'));
  }

  if (request.method === 'PATCH' && url.pathname === '/profile') {
    const body = updateProfileSchema.parse(await request.json());
    return Response.json(await profileService.updateProfile('demo-user-id', body));
  }

  return Response.json({ message: 'Not Found' }, { status: 404 });
}
