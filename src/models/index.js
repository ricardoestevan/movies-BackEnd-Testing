const Movie = require("./Movie")
const Actor = require("./Actor")
const Director = require("./Director")
const Genre = require("./Genre")

Movie.belongsToMany(Genre, {through: 'movieGenres'})
Genre.belongsToMany(Movie, {through: 'movieGenres'})

Actor.belongsToMany(Movie, {through: 'movieActors'})
Movie.belongsToMany(Actor, {through: 'movieActors'})

Director.belongsToMany(Movie, {through: 'movieDirectors'})
Movie.belongsToMany(Director, {through: 'movieDirectors'})
