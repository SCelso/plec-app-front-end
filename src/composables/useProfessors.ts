import { inject } from "vue";
import { HttpAxios } from "../api/http-axios";
import { ErrorResponse } from "../interfaces/responses/error.response";
import { User } from "../interfaces/user.interface";

export function useProfessors() {
    const apiUrl = inject("apiUrl") + "users/professors";
    const http = new HttpAxios();

    const getProfessors = async (term: string = "") => {
        return new Promise<User[]>((resolve, reject) => {
            http.get(apiUrl, {
                term,
            })
                .then((data: User[]) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse[]) => {
                    reject(error);
                });
        });
    };

    return {
        getProfessors,
    };
}
