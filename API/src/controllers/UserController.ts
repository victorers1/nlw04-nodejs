import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email('Email inválido').required('Email é obrigatório'),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error);
        }

        const usersRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await usersRepository.findOne({ email }); // SELECT * FROM USERS WHERE EMAIL = 'EMAIL
        if (userAlreadyExists) {
            throw new AppError('User already exists');
        }
        const user = usersRepository.create({
            name, email
        });
        await usersRepository.save(user);
        return response.status(201).json(user);
    }

    async show(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);
        const all = await usersRepository.find();
        return response.json(all);
    }
}

export { UserController };
