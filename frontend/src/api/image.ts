import axios from 'axios';

import { API } from "../constants/urls";

type GetImagesType = {
    images: Array<ImageType>
}

type SaveImageType = {
    image: ImageType
}

export class ImageApi {
    static getImages() {
        return axios.get<GetImagesType>(`${API}/images`).then(data => data.data);
    }

    static saveImage(fd: FormData) {
        return axios.post<SaveImageType>(`${API}/images`, fd).then(data => data.data);
    }

    static pingServer() {
        return axios.get(`${API}/test/ping`).then(data => data.data);
    }
}
