import ErrorApi from "./ErrorApi";

export default interface ResponseApi<T> {
    data?: T;
    error?: ErrorApi;
}