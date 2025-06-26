import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/Login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private prisma: PrismaService) {}

    async validateUser(user:LoginDTO){
        const foundUser = await  this.prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if(!foundUser) {
            return null;
        }

        if(foundUser.password == user.password) {
            return this.jwtService.sign({
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role,
            });
        }
    }
    
}
