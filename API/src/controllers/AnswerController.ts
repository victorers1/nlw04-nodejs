import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { QueryExpressionMap } from 'typeorm/query-builder/QueryExpressionMap';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
    /*
        http://localhost:3333/answers/1?u=qwerw-rerw-rewrew-qwer
        Route params => parâmetros que compõe a rota
        routes.get('answers/:value/:nota');

        Query Params => Busca, Paginação, não obrigatório
        Vem após o '?'
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });
        if (!surveyUser) {
            return response.status(400).json({
                error: 'Survey User does not exists.'
            });
        }
        surveyUser.value = Number(value);
        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);

    }
}

export { AnswerController };