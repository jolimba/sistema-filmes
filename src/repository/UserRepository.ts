import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Users } from "../entity/Users"

export class UserRepository {
    
    getAll = async () => {
        await AppDataSource.initialize()
        return AppDataSource.manager.find(Users)
    }

    getOne = async (idUser: number) => {
        await AppDataSource.initialize()
        return  AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .where("user.id = :id", { id: idUser })
            .getOne()
    }

    addNewUser = async (
        first_name: string,
        last_name: string,
        birth_date: string,
        email_user: string,
        login_user: string,
        pw_user: string
    ) => {
        await AppDataSource.initialize()
        const user = new Users()
        user.firstName = first_name
        user.lastName = last_name
        user.birthDate = birth_date
        user.emailUser = email_user
        user.loginUser = login_user
        user.pwUser = pw_user
        await AppDataSource.manager.save(user)
    }

    updateUser = async (
        idUser: number,
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
            .where("id = :id", { id: idUser })
            .set({
                firstName: first_name,
                lastName: last_name,
                birthDate: birth_date,
                emailUser: email_user,
                loginUser: login_user,
                pwUser: pw_user
            })
            .execute()
    }

    removeUser = async (idUser: number) => {
        await AppDataSource.initialize()
        await AppDataSource.manager
        .createQueryBuilder(Users, "user")
        .delete()
        .from(Users)
        .where("id = :id", {id: idUser})
        .execute()
    }

    loginUser = async (pwUser: string, loginUser = null, emailUser = null) => {
        await AppDataSource.initialize()
        if(loginUser != null) {
            return AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .where("user.loginUser = :login and user.pwUser = :pw", { login: loginUser, pw: pwUser})
            .getOne()
        }
        return AppDataSource.manager
            .createQueryBuilder(Users, "user")
            .where("user.emailUser = :email and user.pwUser = :pw", { email: emailUser, pw: pwUser})
            .getOne()
    }
}
