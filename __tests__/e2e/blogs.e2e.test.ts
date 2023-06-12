import request from 'supertest'
import {app} from '../../src/settings'
import {BlogType} from '../../src/types';




const testBlogInputData = {
    name: 'blog1',
    description: 'description1',
    websiteUrl: 'https://youtube1.com'
}


describe('/blogs', () => {
    let newTestBlog: BlogType | null = null



    beforeAll(async () => {
        //await client.connect()
        await request(app).delete('/testing/all-data').expect(204)
    })


    it('GET blogs = []', async () => {
        await request(app)
            .get('/blogs')
            .expect(200,[])
    })

    it('POST new blog and return 201', async () => {
        const response = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send(testBlogInputData)

        expect(response.status).toBe(201)
        const newBlog = response.body
        expect(newBlog).toEqual({
            id: expect.any(String),
            name: testBlogInputData.name,
            description: testBlogInputData.description,
            websiteUrl: testBlogInputData.websiteUrl,
            createdAt: expect.any(String),
            isMembership: false
        })
    })

    it('POST return 401 unauthorized error', async () => {
        const response = await request(app)
            .post('/blogs')
            .auth('admin', 'qwertywrongpas')
            .send(testBlogInputData)

        expect(response.status).toBe(401)
    })

    it('POST return 400 with incorrect  name length error', async () => {
        const blogInputData = {
            name: 'Very very long incorrect name with more then 15 symbols',
            description: 'description2',
            websiteUrl: 'https://youtube2.com'
        }

        const response = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send(blogInputData)

        expect(response.status).toBe(400)
        const error = response.body
        expect(error).toEqual({
            "errorsMessages": [
                {
                    "message": "Incorrect length",
                    "field": "name"
                }
            ]
        })
    })


})