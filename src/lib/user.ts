import { db } from './prisma';

// Créer un utilisateur avec email et mot de passe
export async function createUser(email: string, password: string) {
  return db.user.create({ data: { email, password } });
}

// Récupérer un utilisateur par son email
export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}
