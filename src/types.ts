import {Request} from 'express';
import {ObjectId} from 'mongodb';
export type BlogType = {
    _id?: ObjectId
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}
export type PostType = {
    _id?: ObjectId
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

// export type ErrorsMessageType = {
//     message: string;
//     field: string
// }

export const blogsDataBase: BlogType[] = []
export const postsDataBase: PostType[] = []

export type RequestWithParams<T> = Request<T>
export type RequestWithBody<T> = Request<{}, {},T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>
