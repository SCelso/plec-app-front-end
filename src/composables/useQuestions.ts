import { inject } from "vue";
import { HttpAxios } from "../api/http-axios";
import { ErrorResponse } from "../interfaces/responses/error.response";
import { Question } from "../interfaces/question.interface";

export function useQuestions() {
    const apiUrl = inject("apiUrl") + "questions";
    const http = new HttpAxios();

    // const getQuestions = async (userId: string = "") => {
    //     return new Promise<Question[]>((resolve, reject) => {
    //         http.get(apiUrl + "/" + userId, {})
    //             .then((data: Question[]) => {
    //                 resolve(data);
    //             })
    //             .catch((error: ErrorResponse[]) => {
    //                 reject(error);
    //             });
    //     });
    // };
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

    return {
        // getQuestions,
        getQuestionsByProfessorAndTag,
    };
}
