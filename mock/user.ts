import { Request, Response } from 'express';

function ddd(req: Request, res: Response) {
  console.log(req.query);
  return res.json({
    status: 'ok',
  });
}

export default {
  'POST  /api/register': ddd,
  'POST  /api/login': ddd,
};
