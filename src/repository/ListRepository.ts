import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Lists } from "../entity/Lists"
import { Users } from "../entity/Users"
import { Movies } from "../entity/Movies"

export class ListRepository {

    getUserList = async (user: Users) : Promise<Lists[]> => {
        await AppDataSource.initialize()
        let user_list = await AppDataSource.manager
            .createQueryBuilder(Lists, "lists")
            .where("lists.users = :id", { id: user.id })
            .leftJoinAndSelect("lists.users", "users")
            .leftJoinAndSelect("lists.movies", "movies")
            .getMany()
        await AppDataSource.destroy()
        return user_list
    }

    addToList = async (user: Users, movie: Movies) => {
        await AppDataSource.initialize()
        let list = new Lists()
        list.users = user
        list.movies = movie
        await AppDataSource.manager.save(list)
        .then(res => { console.log(res)})
        await AppDataSource.destroy()
        return `The movie ${movie.series_title} has been added`
    }

    removeList = async (user: Users) : Promise<string> => {
        await AppDataSource.initialize()
        await AppDataSource.manager
        .createQueryBuilder(Lists, "lists")
        .delete()
        .from(Lists)
        .where("users = :users", {users: user.id})
        .execute()
        await AppDataSource.destroy()
        return `${user.firstName}'s list removed.`
    }

    removeOneMovie = async (user: Users, movie: Movies) : Promise<string> => {
        await AppDataSource.initialize()
        await AppDataSource.manager
        .createQueryBuilder(Lists, "lists")
        .delete()
        .from(Lists)
        .where("users = :users AND movies = :movies", {users: user.id, movies: movie.id_program})
        .execute()
        await AppDataSource.destroy()
        return `Movie ${movie.series_title} from ${user.firstName}'s list was removed.`
    }
}