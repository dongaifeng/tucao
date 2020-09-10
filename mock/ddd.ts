import { Request, Response } from 'express';

function ddd(req: Request, res: Response) {
  console.log(req.query);
  return res.json({
    name: `${req.query.name}我爱你`,
  });
}

export default {
  'GET  /api/ddd': ddd,
};
