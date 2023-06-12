import express from 'express'
import bodyParser from 'body-parser';
import {blogRouters} from './routers/blogs_routers';
import {runDb} from './repositories/db';
import {testingRouter} from './routers/testing_routers';
import {postRouters} from './routers/posts_routers';


export const app = express()
const port = process.env.PORT || 5000

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
app.use('/blogs', blogRouters)
app.use('/posts', postRouters)
app.use('/testing', testingRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
