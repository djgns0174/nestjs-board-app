import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    private userRepository :UserRepository;
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository;
    }

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}
