import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@EntityRepository()
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const username = authCredentialsDto.username;
        const password = authCredentialsDto.password;

        const user = this.create({ username, password });

        await this.save(user);
    }
}