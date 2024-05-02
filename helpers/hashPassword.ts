import crypto from 'crypto';

export function getSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}
