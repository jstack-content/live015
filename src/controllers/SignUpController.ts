import { hash } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AccountsRepository } from '../repositories/AccountsRepository';

export class SignUpController {
  static schema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8),
    name: z.string().min(1),
  });

  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = this.schema.safeParse(request.body);

    if (!result.success) {
      return reply
        .code(400)
        .send({ errors: result.error.issues });
    }

    const { email, name, password } = result.data;

    const accountAlreadyExists = await AccountsRepository.findByEmail(email);

    if (accountAlreadyExists) {
      return reply
        .code(409)
        .send({ errors: 'This email is already in use.' });
    }

    const hashedPassword = await hash(password, 12);

    const account = await AccountsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return reply
      .code(201)
      .send({
        account: {
          id: account.id,
          name: account.name,
          email: account.email,
        },
      });
  };
}
