import {BlogMongoDbType, PostMongoDbType, PostType} from '../types';
import {blogsCollection, postsCollection} from './db';
import {ObjectId} from 'mongodb';
import {PostInputModel} from '../models/post/Post_Post_Model';
import {PutPostModel} from '../models/post/Put_Post_Model';
import {blogsRepository} from './blogs_repository';


export const postsRepository = {

    async findAllPosts(): Promise<PostType[]> {
        const allPosts = await postsCollection.find({}).toArray()
        return allPosts.map((post: PostMongoDbType) => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
    },

    async findPostById(id: string): Promise<PostType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        let _id = new ObjectId(id)
        const foundedPost: PostMongoDbType | null = await postsCollection.findOne({_id: _id})

        if (!foundedPost) {
            return null
        }
        return {
            id: foundedPost._id.toString(),
            title: foundedPost.title,
            shortDescription: foundedPost.shortDescription,
            content: foundedPost.content,
            blogId: foundedPost.blogId,
            blogName: foundedPost.blogName,
            createdAt: foundedPost.createdAt
        }
    },

    async createPost(data: PostInputModel): Promise<PostType | undefined> {
        // const postByBlogId = await blogsCollection.findOne({id: data.blogId})
        const postByBlogId = await blogsCollection.findOne({_id: new ObjectId(data.blogId)}) // почему так?
        if (!postByBlogId) {
            return undefined
        }
            const addedPost: PostMongoDbType = {
                _id: new ObjectId(),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: postByBlogId.name,
                createdAt: new Date().toISOString(),
            }

            await postsCollection.insertOne(addedPost)
            return {
                id: addedPost._id.toString(),
                title: addedPost.title,
                shortDescription: addedPost.shortDescription,
                content: addedPost.content,
                blogId: addedPost.blogId,
                blogName: addedPost.blogName,
                createdAt: addedPost.createdAt
            }
    },

    async updatePost(id: string, data: PutPostModel): Promise<boolean> {
        // const postByBlogId = await blogsCollection.findOne({id: data.blogId})
        // const postByBlogId = await blogsCollection.findOne({_id: new ObjectId(data.blogId)})
        // const postById = await blogsCollection.findOne({id: id})
        //
        // if (!postByBlogId || !postById) {
        //     return false
        // }

        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId
            }
        })
        return result.matchedCount === 1
    },

    async deletePostById(id: string): Promise<boolean> {
        // if (!ObjectId.isValid(id)) {
        //     return false
        // }
        // const _id = new ObjectId(id)
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

}