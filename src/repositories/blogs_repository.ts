// import {BlogType} from '../types';
import {blogsCollection} from './db';
import {BlogInputModel} from '../models/blog/Post_Blog_Model';
import {UpdateBlogModel} from '../models/blog/Put_Blog_Model';
import {BlogType} from '../types';


export const blogsRepository = {
    async findAllBlogs(): Promise<BlogType[]> {
        return blogsCollection.find({}).toArray()
    },
    // async findBlogById(id: string): Promise<BlogType | null> {
    //     const foundedBlog: BlogType | null = await blogsCollection.findOne({id: id})
    //     if (foundedBlog) {
    //         return foundedBlog;
    //     } else {
    //         return null
    //     }
    // },
    async createBlog(name: string): Promise<BlogType> {
        const result = await blogsCollection.insertOne({name})
        return {
            name: name,
            _id: result.insertedId
        }
    }
}
//     async updateBlog(id: string, name: string, description: string ,websiteUrl: string): Promise<boolean> {
//         const result = await blogsCollection.updateOne({id: id}, {$set: {name: name
//                 ,description: description, websiteUrl:websiteUrl}})
//         return result.matchedCount === 1
//     },
//     async deleteBlog(id: string): Promise<boolean> {
//         const result = await blogsCollection.deleteOne({id: id})
//         return result.deletedCount === 1
//     }
// }