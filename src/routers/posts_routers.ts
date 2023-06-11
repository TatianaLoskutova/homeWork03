import {Request, Response, Router} from 'express';
import {PostType, RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from '../types';
import {postsRepository} from '../repositories/posts_repository';
import {GetByIdParam} from '../models/Get_By_Id';
import {authMiddleware} from '../middlewares/authorization_validation';
import {errorsMiddleware} from '../middlewares/errors_validation';
import {PostInputModel} from '../models/post/Post_Post_Model';
import {postBlogIdValidation, postContentValidation, postShortDescription, postTitleValidation} from '../middlewares/posts_validators';
import {PutPostModel} from '../models/post/Put_Post_Model';



export const postRouters = Router()

postRouters.get('/', async (req:Request, res: Response) => {
    const allPosts: PostType[] = await postsRepository.findAllPosts()
    res.status(200).send(allPosts)
})

postRouters.get('/:id', async (req: RequestWithParams<GetByIdParam>, res: Response<PostType>) => {
    const foundedPost = await postsRepository.findPostById(req.params.id)
    if (!foundedPost) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundedPost)
})

postRouters.post('/',
    authMiddleware,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    postBlogIdValidation,
    errorsMiddleware,
    async (req: RequestWithBody<PostInputModel>, res: Response<PostType>) => {
        const newPost = await postsRepository.createPost(req.body)
        res.status(201).send(newPost)
    })

postRouters.put('/:id',
    authMiddleware,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    postBlogIdValidation,
    errorsMiddleware,
    async (req: RequestWithParamsAndBody<GetByIdParam,PutPostModel>, res: Response<PostType>) => {
        const isUpdated = await postsRepository.updatePost(req.params.id, req.body)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

postRouters.delete('/:id',
    authMiddleware,
    async (req: RequestWithParams<GetByIdParam>, res: Response) => {
        const isDeleted = await postsRepository.deletePostById(req.params.id)
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })