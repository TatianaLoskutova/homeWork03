// import {BlogType, PostType} from '../types';
import {MongoClient, ObjectId} from 'mongodb';

export type BlogType = {
    _id?: ObjectId
    name: string
}

// const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
// console.log(process.env.MONGO_URL)
const url = 'mongodb+srv://tanisha:Loskutidze1988@cluster0.clobhkg.mongodb.net/network-dev?retryWrites=true&w=majority'
console.log('url :', url)
const client = new MongoClient(url)


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