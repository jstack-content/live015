import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'node:crypto';

export class ListOrdersController {
  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    return reply
      .code(200)
      .send({
        orders: [
          {
            id: crypto.randomUUID(),
            orderNumber: '#001',
            date: Date.now()
          },
          {
            id: crypto.randomUUID(),
            orderNumber: '#002',
            date: Date.now()
          },
          {
            id: crypto.randomUUID(),
            orderNumber: '#003',
            date: Date.now()
          },
        ],
      });
  };
}
