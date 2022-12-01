import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.API_BASE_URL;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = `${
                containSlash ? config.url.slice(0, -1) : config.url
            }.json`;
        }

        console.log(config.url);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data
        ? Object.values(data).map((value) => ({
              ...value
          }))
        : [];
}

axios.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        console.log(res.data);
        return res;
    },
    function (e) {
        const isExpectedError =
            e.response && e.response.status >= 400 && e.response.status < 500;
        if (!isExpectedError) {
            console.log(e);
            toast.error(
                "An unexpected error has occurred, please try to change it later"
            );
            // Например вывести ошибку пользователю
            // alert(e);
        }
        return Promise.reject(e);
    }
);

const httpServices = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpServices;
