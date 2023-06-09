import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv'
import {BlogType, PostType} from '../types';
dotenv.config()



// const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017' проверить потом с 27017

const mongoURI = process.env.MONGO_URL
console.log('url :', mongoURI)
if (!mongoURI) {
    throw new Error('Url is not exist')
}
const client = new MongoClient(mongoURI)


export const blogsCollection = client.db().collection<BlogType>('blogs')
export const postsCollection = client.db().collection<PostType>('posts')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully to mongo server')
    } catch (e) {
        console.log('Can\'t connect successfully to mongo server')
        await client.close()
    }
}