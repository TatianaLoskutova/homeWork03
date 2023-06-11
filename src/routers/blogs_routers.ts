import {Router, Request, Response} from 'express';
import {blogsRepository} from '../repositories/blogs_repository';
import {authMiddleware} from '../middlewares/authorization_validation';
import {blogDescriptionValidation, blogNameValidation, blogWebsiteUrlValidation} from '../middlewares/blogs_validators';
import {BlogType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from '../types';
import {BlogInputModel} from '../models/blog/Post_Blog_Model';
import {errorsMiddleware} from '../middlewares/errors_validation';
import {UpdateBlogModel} from '../models/blog/Put_Blog_Model';
import {GetByIdParam} from '../models/Get_By_Id';

export const blogRouters = Router()

blogRouters.get('/', async (req:Request, res: Response) => {
    const allBlogs: BlogType[] = await blogsRepository.findAllBlogs()
    res.status(200).send(allBlogs)
})

blogRouters.get('/:id', async (req: RequestWithParams<GetByIdParam>, res: Response<BlogType>) => {
    let foundedBlog = await blogsRepository.findBlogById(req.params.id)
    if (!foundedBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundedBlog)
})

blogRouters.post('/',
    authMiddleware,
    blogNameValidation,
    blogDescriptionValidation,
    blogWebsiteUrlValidation,
    errorsMiddleware,
    async (req: RequestWithBody<BlogInputModel>, res: Response<BlogType>) => {
        const newBlog = await blogsRepository.createBlog(req.body)
        res.status(201).send(newBlog)
    })

blogRouters.put('/:id',
    authMiddleware,
    blogNameValidation,
    blogDescriptionValidation,
    blogWebsiteUrlValidation,
    errorsMiddleware,
    async (req: RequestWithParamsAndBody<GetByIdParam,UpdateBlogModel>, res: Response<BlogType>) => {
        const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogRouters.delete('/:id',
    authMiddleware,
    async (req: RequestWithParams<GetByIdParam>, res: Response) => {
        const isDeleted = await blogsRepository.deleteBlogById(req.params.id)
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })



