import {Router, Request, Response} from 'express';
import {blogsDataBase, postsDataBase} from '../types';

export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    blogsDataBase.splice(0)
    postsDataBase.splice(0)
    res.sendStatus(204)
})