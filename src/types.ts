import {Request} from 'express';
import {ObjectId} from 'mongodb';
export type BlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type BlogMongoDbType = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type PostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type PostMongoDbType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type ValidationError = {
    message: string;
    field: string
}


export type RequestWithParams<T> = Request<T>
export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>
