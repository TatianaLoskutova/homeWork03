import {body} from 'express-validator';
import {blogsRepository} from '../repositories/blogs_repository';


export const postTitleValidation = body('title')
    .isString().withMessage('Should be string')
    .trim().isLength({min: 1, max: 30}).withMessage('Incorrect length')
export const postShortDescription = body('shortDescription')
    .isString().withMessage('Should be string')
    .trim().isLength({min: 1, max: 100}).withMessage('Incorrect length')
export const postContentValidation = body('content')
    .isString().withMessage('Should be string')
    .trim().isLength({min: 1, max: 1000}).withMessage('Incorrect length')
export const postBlogIdValidation = body('blogId')
    .isString().withMessage('Should be string')
    .custom(id => {
        const findBlogWithId = blogsRepository.findBlogById(id)
        if (!findBlogWithId) {
            throw new Error('Blog is not found')
        } else {
            return true
        }

    })