import {Router, Request, Response} from 'express';
import {blogsRepository} from '../repositories/blogs_repository';
import {postsRepository} from '../repositories/posts_repository';

export const testingRouter = Router()

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await blogsRepository.deleteAllBlogs()
    await postsRepository.deleteAllPosts()
    res.sendStatus(204)
})