export type PasswordRequirementId = "length" | "letter" | "number";

export type PasswordRequirement = {
  id: PasswordRequirementId;
  label: string;
  met: boolean;
};

export function getPasswordRequirements(value: string): PasswordRequirement[] {
  return [
    {
      id: "length",
      label: "At least 8 characters",
      met: value.length >= 8,
    },
    {
      id: "letter",
      label: "At least one letter",
      met: /[A-Za-z]/.test(value),
    },
    {
      id: "number",
      label: "At least one number",
      met: /\d/.test(value),
    },
  ];
}

/** Sign up: min 8 chars, letter, and number. */
export function getSignupPasswordError(value: string): string | null {
  if (!value) return "Create a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  if (!/[A-Za-z]/.test(value)) return "Include at least one letter.";
  if (!/\d/.test(value)) return "Include at least one number.";
  return null;
}
