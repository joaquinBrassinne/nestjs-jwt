type UserWithoutPassword = Omit<User, 'password'>;
import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';


export class UserEntity implements UserWithoutPassword {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  role: Role = 'USER';
}
