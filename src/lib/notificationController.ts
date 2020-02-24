import { Request, Response, NextFunction } from 'express'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const text = request.params.text
      if (!text) throw new Error('text is required')
      response.status(201).json({ text })
    })().catch(next)
  }
}

export default notificationController
