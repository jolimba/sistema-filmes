import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Movies } from "../entity/Movies"


export class MoviesRepository {
    getOne = async (movie_name: any) : Promise<Movies> => {
        try {
            await AppDataSource.initialize()
            
            let movie_info = await AppDataSource.manager
                .createQueryBuilder(Movies, "movies")
                .where(`lower(movies.series_title) ILIKE :name`, { name: `%${movie_name}%` })
                .getOne()
            await AppDataSource.destroy()
            return movie_info
        } catch (error) {
            await AppDataSource.destroy()
            console.log(error)
        }
        await AppDataSource.destroy()
    }

    getOneById = async (movie_id: any) : Promise<Movies> => {
        try {
            await AppDataSource.initialize()
            let movie_info = await AppDataSource.manager
                .createQueryBuilder(Movies, "movies")
                .where(`movies.id_program = :id`, { id: movie_id })
                .getOne()
            await AppDataSource.destroy()
        return movie_info
        } catch (error) {
            await AppDataSource.destroy()
            console.log(error)
        }
    }

    addNewMovie = async (movie) : Promise<boolean> => {
        let title = movie.original_title
        let votes = movie.vote_count
        let rating = movie.vote_average
        let overview = movie.overview
        let director = movie.director || ''
        let star1 = movie.star1 || ''
        let star2 = movie.star2 || ''
        try {
            await AppDataSource.initialize()
            const movies = new Movies()
            movies.series_title = title
            movies.no_of_votes = votes
            movies.imdb_rating = rating
            movies.overview = overview
            movies.director = director
            movies.star1 = star1
            movies.star2 = star2
            await AppDataSource.manager.save(movies)
            await AppDataSource.destroy()
            return true
        } catch (error) {
            console.log(error)
        }
    }

}