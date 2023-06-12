import request from 'supertest'
import { app } from '../src/index/'
import {BlogType} from '../../src/types';

const blog1 = {
    name: 'blog1',
    description: 'description1',
    websiteUrl: 'https://youtube1.com'
}

describe('/blogs', () => {
    let newTestBlog: BlogType | null = null

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('GET blogs = []', async () => {
        await request(app).get('/blogs').expect([])
    })

})