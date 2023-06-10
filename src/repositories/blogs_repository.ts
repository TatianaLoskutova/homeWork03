import {blogsCollection} from './db';
import {BlogInputModel} from '../models/blog/Post_Blog_Model';
import {BlogType} from '../types';
import {ObjectId} from 'mongodb';


export const blogsRepository = {
    async findAllBlogs(): Promise<BlogType[]> {
        const result = await blogsCollection.find({}).toArray()
        return result.map(b => ({
            id: b._id.toString(),
            name: b.name,
            description: b.description,
            websiteUrl: b.websiteUrl,
            createdAt: b.createdAt,
            isMembership: b.isMembership
        }))
    },
    // async findBlogById(id: string): Promise<BlogType | null> {
    //     const foundedBlog: BlogType | null = await blogsCollection.findOne({id: id})
    //     if (foundedBlog) {
    //         return foundedBlog;
    //     } else {
    //         return null
    //     }
    // },
    async createBlog(data: BlogInputModel): Promise<BlogType> {
        const newBlog: BlogType = {
            _id: new ObjectId(),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogsCollection.insertOne(newBlog)
        return newBlog
        // return {
        //     id: newBlog._id.toString(),
        //     name: newBlog.name,
        //     description: newBlog.description,
        //     websiteUrl: newBlog.websiteUrl,
        //     createdAt: newBlog.createdAt,
        //     isMembership: newBlog.isMembership
        // }
    },

    // async deleteBlog(id: string): Promise<boolean> {
    //     const result = await blogsCollection.deleteOne({id: id})
    //     return result.deletedCount === 1
    // }


}
//     async updateBlog(id: string, name: string, description: string ,websiteUrl: string): Promise<boolean> {
//         const result = await blogsCollection.updateOne({id: id}, {$set: {name: name
//                 ,description: description, websiteUrl:websiteUrl}})
//         return result.matchedCount === 1
//     },

