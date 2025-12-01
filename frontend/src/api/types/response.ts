export interface APIGeneralResponse<T> {

    success: boolean;
    message: string;
    data: T;
}