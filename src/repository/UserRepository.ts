import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Users } from "../entity/Users"

export class UserRepository {
    
    getAll = async () : Promise<Users[]> => {
        await AppDataSource.initialize()
        let users = await AppDataSource.manager.find(Users)
        await AppDataSource.destroy()
        return users
    }

    getOne = async (id_user: number) : Promise<Users> => {
        await AppDataSource.initialize()
        let user = await AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .where("user.id = :id", { id: id_user })
            .getOne()
        await AppDataSource.destroy()
        return user
    }

    addNewUser = async (
        first_name: string,
        last_name: string,
        birth_date: string,
        email_user: string,
        login_user: string,
        pw_user: string
    ) : Promise<boolean> => {
        await AppDataSource.initialize()
        const user = new Users()
        user.first_name = first_name
        user.last_name = last_name
        user.birth_date = birth_date
        user.email_user = email_user
        user.login_user = login_user
        user.pw_user = pw_user
        await AppDataSource.manager.save(user)
        await AppDataSource.destroy()
        return true
    }

    updateUser = async (
        id_user: number,
        first_name: string,
        last_name: string,
        birth_date: string,
        email_user: string,
        login_user: string,
        pw_user: string
    ) => {
        await AppDataSource.initialize()
        await AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .update()
            .where("id = :id", { id: id_user })
            .set({
                first_name: first_name,
                last_name: last_name,
                birth_date: birth_date,
                email_user: email_user,
                login_user: login_user,
                pw_user: pw_user
            })
            .execute()
        await AppDataSource.destroy()
        return true
    }

    removeUser = async (id_user: number) => {
        await AppDataSource.initialize()
        await AppDataSource.manager
        .createQueryBuilder(Users, "user")
        .delete()
        .from(Users)
        .where("id = :id", {id: id_user})
        .execute()
        await AppDataSource.destroy()
    }

    loginUser = async (pwUser: string, loginUser = null, emailUser = null) => {
        await AppDataSource.initialize()
        if(loginUser != null) {
            return AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .where("user.login_user = :login and user.pw_user = :pw", { login: loginUser, pw: pwUser})
            .getOne()
        }
        let user = await AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .where("user.email_user = :email and user.pw_user = :pw", { email: emailUser, pw: pwUser})
            .getOne()
        await AppDataSource.destroy()
        return user
    }
}
