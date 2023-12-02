import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api/'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    console.log(error);
    if (!error.response) return Promise.reject(error);
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        default:
            toast.error(data.title);
            break;  
    }
    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, data: object) => axios.post(url, data).then(responseBody),
    postNoBody: (url: string) => axios.post(url).then(responseBody),
    put: (url: string, data: object) => axios.put(url, data).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Words = {
    random: () => requests.get('words/random')
}

const TestErrors = {
    get400Error: () => requests.get('MockErrors/bad-request'),
    get401Error: () => requests.get('MockErrors/unauthorized'),
    get404Error: () => requests.get('MockErrors/not-found'),
    get500Error: () => requests.get('MockErrors/server-error'),
    getValidationError: () => requests.get('MockErrors/validation-error')
}

const Account = {
    login: (data: object) => requests.post('Account/login', data),
    register: (data: object) => requests.post('Account/register', data),
    currentUser: () => requests.get('Account/current-user')
}

const WordInteractions = {
    mine: () => requests.get('WordInteractions/mine'),
    new: (data: object) => requests.post('WordInteractions', data),
    favorite: (wordId: number) => requests.postNoBody(`WordInteractions/favorite/${wordId}`),
    isFavorite: (wordId: number) => requests.get(`WordInteractions/favorite/${wordId}`),
    getFavorites: () => requests.get('WordInteractions/favorites'),
}

const agent = {
    Words,
    TestErrors,
    Account,
    WordInteractions
}

export default agent;