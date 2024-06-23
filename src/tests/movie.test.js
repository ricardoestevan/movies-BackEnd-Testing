require('../models')
const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const movie = {
    name: 'Die Hard',
    image: 'DiehHard4.png',
    synopsis: 'This movie is a sequel of Die Hard',
    releaseYear: '2010-05-05'
}

const movieUpdate = {
    name: 'Die Hard 5',
    image: 'DieHard5.png',
    synopsis: 'This movie is a sequel of the previous Die hard movie',
    releaseYear: '2020-10-05'
    
}

let movieId 
let actor
let director
let genre

const BASE_URL = '/api/v1/movies'

afterAll(async() =>{
    await actor.destroy()
    await director.destroy()
    await genre.destroy()
})

test('POST => "BASE_URL" should return status code 201 and res.body.name ==== movie.name', async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test('GET => "BASE_URL" should return status code 200 and res.body[0].name ==== movie.name', async () => {

    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(movie.name)
    expect(res.body).toHaveLength(1)
})

test('PUT => "BASE_URL/:id" should return status code 200 and res.body.name ==== movieUpdate.name', async () => {

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})

test('POST => "BASE_URL/:id/actors" should return status code 200 and res.body.[0].movieActors.actorId ==== actor.id', async () => {
    
    actor = await  Actor.create ({
        firstName: 'Steven',
        lastName: 'Spilberg',
        nationality: 'American',
        image: 'sspilber.png',
        birthday: '1985-10-05'
    })
    
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieActors.actorId).toBe(actor.id)
    expect(res.body[0].movieActors.movieId).toBe(movieId)
})

test('POST => "BASE_URL/:id/directors" should return status code 200 and res.body.[0].movieDirectors.directorId ==== director.id', async () => {
    
    director = await  Director.create ({
        firstName: 'Steven',
        lastName: 'Spilberg',
        nationality: 'American',
        image: 'sspilber.png',
        birthday: '1985-10-05'
    })
    
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieDirectors.directorId).toBe(director.id)
    expect(res.body[0].movieDirectors.movieId).toBe(movieId)
})

test('POST => "BASE_URL/:id/genres" should return status code 200 and res.body.[0].movieGenres.genreId ==== genre.id', async () => {
    
    genre = await  Genre.create ({
        name: 'Action'
    })
    
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieGenres.genreId).toBe(genre.id)
    expect(res.body[0].movieGenres.movieId).toBe(movieId)
})


test('DELETE => "BASE_URL/:id" should return status code 204 and res.body.name ==== movieUpdate.name', async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(204)
})

