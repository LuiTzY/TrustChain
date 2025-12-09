export interface APIGeneralResponse<T> {

    success: boolean;
    message: string;
    data: T;
}


export interface LoginResponse {
    access: string;
    refresh: string;
}

export interface RegisterResponse {
    access_token: string;
    refresh:string;
}