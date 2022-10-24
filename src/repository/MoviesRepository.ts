import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Movies } from "../entity/Movies"

export class MoviesRepository {
    getOne = async (movie_name: any) : Promise<Movies> => {
        await AppDataSource.initialize()
        let movie_info = await AppDataSource.manager
            .createQueryBuilder(Movies, "movies")
            .where(`movies.series_title = :name`, { name: movie_name })
            .getOne()
        await AppDataSource.destroy()
        return movie_info
    }

    getOneById = async (movie_id: any) : Promise<Movies> => {
        await AppDataSource.initialize()
        let movie_info = await AppDataSource.manager
            .createQueryBuilder(Movies, "movies")
            .where(`movies.id_program = :id`, { id: movie_id })
            .getOne()
        await AppDataSource.destroy()
        return movie_info
    }
}