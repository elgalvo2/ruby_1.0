require('jest')
const { app, server } = require('../app')
const request = require('supertest')
const api = request(app)
const mongoose = require('mongoose')

const task_v2_routes = {
    create: 'create',
    getByCreator: 'getByCreator',
    getByArea: 'getByArea',
    all: '',
    current: 'curreny',
    maskAsDone: 'markAsDone',
    delete: '/'
}


describe('test on taskV2 get all route', () => {
    test('taskv2 return json', async () => {
        await api
            .get(`/api/1.0/task_v2/${task_v2_routes.all}`)
            .expect(200)
    })

    test('return tasks', async () => {
        const response = await api.get(`/api/1.0/task_v2/${task_v2_routes.all}`)
        expect(response.body.success).toBe(true)
    })

    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })
})

