import {NextFunction, Request, Response} from 'express';
import base64 from 'js-base64';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Basic')) {
        res.status(401).send('Authorization header is missing')
        return
    }

    const loginPass = authHeader.replace('Basic', '')
    const [login, password] = base64.decode(loginPass).split(':')

    if (login !== 'tanisha' || password !== 'Loskutidze1988') {
        res.status(401).send('Invalid login or password')
    }
}