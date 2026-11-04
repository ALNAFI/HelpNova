const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function normalizeEmail(value: string): string {
  return value.trim();
}

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function isValidEmail(value: string): boolean {
  const email = normalizeEmail(value);
  if (!email || email.length > 254) return false;
  return EMAIL_PATTERN.test(email);
}

export function getEmailError(value: string): string | null {
  const email = normalizeEmail(value);
  if (!email) return "Enter your email address.";
  if (!isValidEmail(email)) return "Enter a valid email address.";
  return null;
}

/** Login: required only. */
export function getPasswordError(value: string): string | null {
  if (!value) return "Enter your password.";
  return null;
}

export function getNameError(value: string): string | null {
  const name = normalizeName(value);
  if (!name) return "Enter your full name.";
  if (name.length < 2) return "Enter at least 2 characters.";
  return null;
}

export function getSubjectError(value: string): string | null {
  if (!value.trim()) return "Choose a subject.";
  return null;
}

export function getMessageError(value: string): string | null {
  const message = value.trim();
  if (!message) return "Enter a message.";
  if (message.length < 10) return "Enter at least 10 characters.";
  return null;
}

export {
  getPasswordRequirements,
  getSignupPasswordError,
  type PasswordRequirement,
  type PasswordRequirementId,
} from "@/utils/password-requirements";
