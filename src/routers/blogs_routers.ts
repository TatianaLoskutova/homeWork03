import {Router, Request, Response} from 'express';
// import {BlogType} from '../types';
import {blogsRepository} from '../repositories/blogs_repository';
import {GetByIdParam} from '../models/Get_By_Id';
// import {BlogViewModel} from '../models/blog/Blog_View_Model';
// import {BlogInputModel} from '../models/blog/Post_Blog_Model';
// import {authMiddleware} from '../middlewares/authorization_validation';
import {BlogType} from '../repositories/db';
// import {blogDescriptionValidation, blogNameValidation, blogWebsiteUrlValidation} from '../middlewares/blogs_validators';
// import {errorsMiddleware} from '../middlewares/errors_validation';
// import {UpdateBlogModel} from '../models/blog/Put_Blog_Model';


export const blogRouters = Router()

// blogRouters.get('/', async (req:Request, res: Response) => {
//     const allBlogs: BlogType[] = await blogsRepository.findAllBlogs()
//     res.status(200).send(allBlogs)
// })

blogRouters.get('/', async (req:Request, res: Response) => {
    const allBlogs = await blogsRepository.findAllBlogs()
    res.send(allBlogs)
})

// blogRouters.get('/:id', async (req: Request, res: Response) => {
//     let foundedBlog = await blogsRepository.findBlogById(req.params.id)
//     if (!foundedBlog) {
//         res.sendStatus(404)
//         return
//     }
//     res.status(200).send(foundedBlog)
// })


blogRouters.post('/',
    // authMiddleware,
    // blogNameValidation,
    // blogDescriptionValidation,
    // blogWebsiteUrlValidation,
    // errorsMiddleware,
    async (req: Request, res: Response) => {
        const newBlog: BlogType = await blogsRepository.createBlog(req.body.name)
        if (newBlog){
            res.status(201).send(newBlog)
        } else {
            res.sendStatus(404)
        }
    })
// blogRouters.post('/',
//     authMiddleware,
//     // blogNameValidation,
//     // blogDescriptionValidation,
//     // blogWebsiteUrlValidation,
//     // errorsMiddleware,
//     async (req: Request, res: Response) => {
//         const newBlog: BlogType = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUr)
//         res.status(201).send(newBlog)
//
//     })

// blogRouters.put('/:id',
//     authMiddleware,
//     blogNameValidation,
//     blogDescriptionValidation,
//     blogWebsiteUrlValidation,
//     errorsMiddleware,
//     async (req: Request, res: Response) => {
//         const isUpdated = await blogsRepository.updateBlog(req.body.name, req.body.description, req.body.websiteUr)
//         if (isUpdated) {
//             res.sendStatus(204)
//         } else {
//             res.sendStatus(404)
//         }
//     })
//
// blogRouters.delete('/:id',
//     authMiddleware,
//     async (req: Request, res: Response) => {
//         const isDeleted = await blogsRepository.deleteBlog(req.params.id)
//         if (isDeleted) {
//             res.sendStatus(204);
//         } else {
//             res.sendStatus(404);
//         }
//     })
