import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // C1: Async function
    // Promise.resolve(func(req, res, next)).catch(next)
    // C2: All
    try {
      await func(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
