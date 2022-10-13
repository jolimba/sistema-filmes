import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Movies } from "../entity/Movies"

export class MoviesRepository {
    getOne = async (movie_name: any) => {
        await AppDataSource.initialize()
        let movie_info = await AppDataSource.manager
            .createQueryBuilder(Movies, "movies")
            .where(`movies.series_title = :name`, { name: movie_name })
            .getOne()
        await AppDataSource.destroy()
        return movie_info
    }
}