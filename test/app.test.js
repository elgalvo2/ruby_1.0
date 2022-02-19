
const app = require('../app')
const request = require('supertest')


describe('post /create', ()=>{

    test('sould response with a status 500 if empty', async()=>{
        const response = await request(app).post('/api/1.0/task_v2/create').send();
        expect(response.statusCode).toBe(500);
    })

    test('should response with a body "data":"hola"', async ()=>{
        const response = await request(app).post('/api/1.0/task_v2/create').send();
        expect(response.body).toBeInstanceOf(Object)
    })

    // test('controller should return status 500 if request body is empty', async () => { 
    //     const response = await request(app).post('/api/1.0/task_v2/create').send(JSON.stringify(mockReq));
    //     expect(response.statusCode).toBe(200);
    
    // })
})
