const request = require('supertest')
const app = require('../app')

const director = {
    firstName: 'Pepe',
    lastName: 'Hernandez',
    nationality: 'Mexican',
    image: 'phernandez.png',
    birthday: '1985-05-05'
}

const directorUpdate = {
    firstName: 'Steven',
    lastName: 'Spilberg',
    nationality: 'American',
    image: 'sspilber.png',
    birthday: '1985-10-05'
}

let directorId 

const BASE_URL = '/api/v1/directors'

test('POST => "BASE_URL" should return status code 201 and res.body.firstName ==== director.firstName', async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test('GET => "BASE_URL" should return status code 200 and res.body[0].firstName ==== director.firstName', async () => {

    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(director.firstName)
    expect(res.body).toHaveLength(1)
})

test('PUT => "BASE_URL/:id" should return status code 200 and res.body.firstName ==== directorUpdate.firstName', async () => {

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test('DELETE => "BASE_URL/:id" should return status code 204 and res.body.firstName ==== directorUpdate.firstName', async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)
})