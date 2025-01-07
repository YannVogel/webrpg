import { z } from 'zod';

const hasLowercaseLetter = (password: string) => /[a-z]/.test(password);
const hasUppercaseLetter = (password: string) => /[A-Z]/.test(password);
const hasNumber = (password: string) => /[0-9]/.test(password);
const hasSpecialCharacter = (password: string) =>
  /[!@#$%^&*(),.?":{}|<>\-_=+]/.test(password);

const registerSchema = z.object({
  email: z.string().email({ message: "L'email doit être valide" }),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères' })
    .refine(hasLowercaseLetter, {
      message: 'Le mot de passe doit contenir au moins une lettre minuscule',
    })
    .refine(hasUppercaseLetter, {
      message: 'Le mot de passe doit contenir au moins une lettre majuscule',
    })
    .refine(hasNumber, {
      message: 'Le mot de passe doit contenir au moins un chiffre',
    })
    .refine(hasSpecialCharacter, {
      message: 'Le mot de passe doit contenir au moins un caractère spécial',
    }),
});

export default registerSchema;
