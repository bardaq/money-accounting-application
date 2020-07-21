import { serverURL } from "config";

export const fetchAPI = async (url: string, data?: any) => {
    const method = data ? "POST" : "GET";
    const options = {
        method,
        body: data ? JSON.stringify(data) : undefined
    };
    const res = await fetch(`${serverURL}/${url}`, options);
    const text = await res.text();
    const body = text ? JSON.parse(text) : {};
    return body;
}