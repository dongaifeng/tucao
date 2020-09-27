import { Request, Response } from 'express';

function ddd(req: Request, res: Response) {
  console.log(req.query);
  return res.json({
    name: `我爱你`,
  });
}

export default {
  'POST  /api/register': ddd,
};
