import {blogsCollection} from './db';
import {BlogInputModel} from '../models/blog/Post_Blog_Model';
import {BlogMongoDbType, BlogType} from '../types';
import {ObjectId} from 'mongodb';
import {UpdateBlogModel} from '../models/blog/Put_Blog_Model';


export const blogsRepository = {

    async findAllBlogs(): Promise<BlogType[]> {
        const allBlogs = await blogsCollection.find({}).toArray()
        return allBlogs.map((blog: BlogMongoDbType ) => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }) )

    },

    async findBlogById(id: string): Promise<BlogType | null> {
        const foundedBlog: BlogMongoDbType | null = await blogsCollection.findOne({_id: ObjectId})
        if (!foundedBlog) {
            return null
        }
        return {
            id: foundedBlog._id.toString(),
            name: foundedBlog.name,
            description: foundedBlog.description,
            websiteUrl: foundedBlog.websiteUrl,
            createdAt: foundedBlog.createdAt,
            isMembership: foundedBlog.isMembership
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
            createdAt: newBlog.websiteUrl,
            isMembership: newBlog.isMembership
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



