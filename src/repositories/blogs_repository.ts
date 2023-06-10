import {blogsCollection} from './db';
import {BlogInputModel} from '../models/blog/Post_Blog_Model';
import {BlogMongoDbType, BlogType} from '../types';
import {ObjectId} from 'mongodb';
import {UpdateBlogModel} from '../models/blog/Put_Blog_Model';


export const blogsRepository = {

    async findAllBlogs(): Promise<BlogMongoDbType[]> { // тип вопрос
        return await blogsCollection.find({}).toArray()
    },

    async findBlogById(id: string): Promise<BlogType | null> {
        const foundedBlog = await blogsCollection.findOne({id: id})
        if (!foundedBlog) {
            return null
        }
        return {
            id: foundedBlog._id.toString(),
            name: foundedBlog.name,
            description: foundedBlog.description,
            websiteUrl: foundedBlog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
    },

    async createBlog(data: BlogInputModel): Promise<BlogType> {
        const newBlog: BlogMongoDbType = {
            _id: new ObjectId(),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogsCollection.insertOne(newBlog)
        return {
            id: newBlog._id.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
    },

    async updateBlog(id: string, data: UpdateBlogModel): Promise<boolean> {
        const result = await blogsCollection.updateOne({id: id}, {
            $set: {
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl
            }
        })
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}



