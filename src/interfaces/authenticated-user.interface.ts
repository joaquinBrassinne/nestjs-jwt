import { Role } from "@prisma/client"

export interface AuthenticatedRequest extends Request {
    user:{
        userId:String;
        email:String;
        role: Role
    }
}