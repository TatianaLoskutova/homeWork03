// import {NextFunction, Request, Response} from 'express';
// import {ValidationError, validationResult} from 'express-validator';
// const errorFormatter = ({msg}: ValidationError) => {
//     return {...msg}
// }
//
// export const errorsMiddleware = ((req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req).formatWith(errorFormatter)
//     if (!errors.isEmpty()) {
//         return res.status(400).send({errorsMessages: errors.array()})
//     } else {
//         next()
//     }
// })