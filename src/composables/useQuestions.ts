import { inject } from "vue";
import { HttpAxios } from "../api/http-axios";
import { ErrorResponse } from "../interfaces/responses/error.response";
import { Answer, Question } from "../interfaces/question.interface";
import { Tag } from "../interfaces/tag.interface";

interface QuestionsCreateDto {
    description: string;
    answers: Answer[];
    difficulty: number;
    tagsIds: string[];
}

export function useQuestions() {
    const apiUrl = inject("apiUrl") + "questions";
    const http = new HttpAxios();

    const getQuestionsByProfessorAndTag = async (
        professorId: string = "",
        tagId: string = ""
    ) => {
        // return question searching in this endpoint http://localhost:3000/api/questions/search/
        return new Promise<Question[]>((resolve, reject) => {
            http.get(apiUrl + "/search/" + professorId + "/" + tagId, {})
                .then((data: Question[]) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse[]) => {
                    reject(error);
                });
        });
    };

    const createQuestion = async (
        question: Question,
        endpoint: string,
        tags: Tag[]
    ) => {
        const tagsExistId: string[] = tags
            .filter((tag: Tag) => {
                if (tag._id) {
                    return tag._id;
                }
            })
            .map((tag: Tag) => {
                if (tag._id) {
                    return tag._id;
                } else {
                    return "";
                }
            });
        const questionCreateDto: QuestionsCreateDto = {
            description: question.description,
            answers: question.answers,
            difficulty: question.difficulty,
            tagsIds: tagsExistId,
        };
        return new Promise<Question>((resolve, reject) => {
            http.post(apiUrl + endpoint, questionCreateDto)
                .then((data: Question) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse[]) => {
                    reject(error);
                });
        });
    };

    const createSimpleSelectionQuestion = (question: Question, tags: Tag[]) => {
        return createQuestion(question, "/simple-selection", tags);
    };

    const createMultipleSelectionQuestion = (
        question: Question,
        tags: Tag[]
    ) => {
        return createQuestion(question, "/multiple-selection", tags);
    };

    const createTrueFalseQuestion = (question: Question, tags: Tag[]) => {
        return createQuestion(question, "/true-false", tags);
    };

    return {
        // getQuestions,
        getQuestionsByProfessorAndTag,
        createSimpleSelectionQuestion,
        createMultipleSelectionQuestion,
        createTrueFalseQuestion,
    };
}
