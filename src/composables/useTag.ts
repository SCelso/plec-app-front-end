import { inject } from "vue";
import { HttpAxios } from "../api/http-axios";
import { Tag } from "../interfaces/tag.interface";
import { ErrorResponse } from "../interfaces/responses/error.response";

export function useTags() {
    const apiUrl = inject("apiUrl") + "tags-users";
    const http = new HttpAxios();

    const getTags = async (userId: string = "") => {
        return new Promise<Tag[]>((resolve, reject) => {
            http.get(apiUrl + "/" + userId, {})
                .then((data: Tag[]) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse[]) => {
                    reject(error);
                });
        });
    };

    const joinTags = (tags: Tag[], newTags: Tag[]) => {
        newTags.forEach((newTag) => {
            const tag = tags.find((tag) => tag._id === newTag._id);
            if (!tag) {
                tags.push(newTag);
            }
        });
        return newTags;
    };

    return {
        joinTags,
        getTags,
    };
}
