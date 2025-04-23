import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput) {
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword
        return this.prisma.user.create({data});
    }s

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const {where, data} = params;
        return this.prisma.user.update({
            data,
            where
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where
        });
    }

    async findUsers(where: Prisma.UserWhereUniqueInput): Promise<User[]> {
        return this.prisma.user.findMany({
            where
        })
    }

    async findUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where
        })
    }
}
