import { inject } from "vue";
import { HttpAxios } from "../api/http-axios";
import { Tag } from "../interfaces/tag.interface";
import { ErrorResponse } from "../interfaces/responses/error.response";

export function useTags() {
    const apiUrl = inject("apiUrl") + "tags";
    const http = new HttpAxios();

    const getTags = async (term: string = "") => {
        return new Promise<Tag[]>((resolve, reject) => {
            http.get(apiUrl, {
                term,
            })
                .then((data: Tag[]) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse[]) => {
                    reject(error);
                });
        });
    };

    return {
        getTags,
    };
}
