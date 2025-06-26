import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private auth: AuthService) { }

    @Post('login')
    async login(@Body() data: LoginDTO) {
        // Logic for user login
        const userToken = await this.auth.validateUser(data);

        if (!userToken) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

        return userToken;

    };

}
