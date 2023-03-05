export interface Http<T> {
    get(url: string, queryParams: object): Promise<T>;
    post(url: string, body: object, queryParams?: object): Promise<T>;
    patch(url: string, body: object, queryParams: object): Promise<T>;
    delete(url: string, queryParams: object): Promise<T>;
}
