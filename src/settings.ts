import express from 'express';
import bodyParser from 'body-parser';
import {blogRouters} from './routers/blogs_routers';
import {postRouters} from './routers/posts_routers';
import {testingRouter} from './routers/testing_routers';

export const app = express()
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
app.use('/blogs', blogRouters)
app.use('/posts', postRouters)
app.use('/testing', testingRouter)