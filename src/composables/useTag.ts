import { Ref, inject } from "vue";
import { HttpAxios } from "../api/http-axios";
import { Tag } from "../interfaces/tag.interface";
import { ErrorResponse } from "../interfaces/responses/error.response";

export function useTags() {
    const apiUrl = inject("apiUrl");
    const http = new HttpAxios();

    const getTags = async (userId: string = "") => {
        return new Promise<Tag[]>((resolve, reject) => {
            http.get(apiUrl + "tags-users" + "/" + userId, {})
                .then((data: Tag[]) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse[]) => {
                    reject(error);
                });
        });
    };

    // create tag
    const createTag = async (isLoading: Ref<boolean>, tag: Tag) => {
        return new Promise<Tag>((resolve, reject) => {
            isLoading.value = true;
            http.post(apiUrl + "tags", tag)
                .then((data: Tag) => {
                    resolve(data);
                })
                .catch((error: ErrorResponse) => {
                    reject(error);
                });
            isLoading.value = false;
        });
    };

    const getAllTags = async () => {
        return new Promise<Tag[]>((resolve, reject) => {
            http.get(apiUrl + "tags", {})
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
        createTag,
        getAllTags,
    };
}
