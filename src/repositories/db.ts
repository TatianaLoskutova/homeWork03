// import {BlogType, PostType} from '../types';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

export type BlogType = {
    _id?: ObjectId
    name: string
}

// const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
// console.log(process.env.MONGO_URL)
const mongoURI = process.env.MONGO_URL
console.log('url :', mongoURI)
if (!mongoURI) {
    throw new Error('Url is not exist')
}
const client = new MongoClient(mongoURI)


// const client = new MongoClient(mongoURI)
// const db = client.db()

export const blogsCollection = client.db().collection<BlogType>('blogs')
// export const postsCollection = client.db().collection<PostType>('posts')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully to mongo server')
    } catch (e) {
        console.log('Can\'t connect successfully to mongo server')
        await client.close()
    }
}