import superagent from 'superagent';

const API_BASE_PATH = '/api';

function apiUrl(path: string): string {
    return API_BASE_PATH + path;
}

export async function getRequest<T>(path: string): Promise<T> {
    const response = await superagent.get(apiUrl(path));
    return response.body as T;
}

export async function postRequest<T = any>(path: string, postData: string | object): Promise<T> {
    const response = await superagent.post(apiUrl(path)).send(postData);
    return response.body as T;
}
