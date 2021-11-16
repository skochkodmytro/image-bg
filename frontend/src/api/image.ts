import axios from 'axios';

import { API } from "../constants/urls";

type GetImagesType = {
    images: Array<ImageType>
}

export class ImageApi {
    // todo change to get images
    static getImage() {
        return axios.get<GetImagesType>(`${API}/images`).then(data => data.data);
    }
}
