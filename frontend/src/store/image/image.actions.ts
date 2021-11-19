import { ThunkAction } from "redux-thunk";

import { ImageApi } from "../../api/image";
import { AppState } from "../rootStore";
import { RequestStatusEnum } from "../../enums";

export const SET_IMAGES = 'SET_IMAGES';
export const FETCH_IMAGES_STATUS = 'FETCH_IMAGES_STATUS';
export const SAVE_IMAGE_STATUS = 'SAVE_IMAGE_STATUS';

type SetImagesType = {
    type: typeof SET_IMAGES,
    images: Array<ImageType>
}

export const setImages = (images: Array<ImageType>): SetImagesType => (
    { type: SET_IMAGES, images }
);

type FetchImagesStatusType = {
    type: typeof FETCH_IMAGES_STATUS,
    status: RequestStatusEnum
}

export const setFetchImagesStatus = (status: RequestStatusEnum): FetchImagesStatusType => (
    { type: FETCH_IMAGES_STATUS, status }
)

type SaveImageStatusType = {
    type: typeof SAVE_IMAGE_STATUS,
    status: RequestStatusEnum
}

export const setSaveImageStatus = (status: RequestStatusEnum): SaveImageStatusType => (
    { type: SAVE_IMAGE_STATUS, status }
)

export const fetchImages = (limit: number = 1000, skip: number = 0): ThunkAction<any, AppState, unknown, ImageActionsTypes> => {
    return async dispatch => {
        dispatch(setFetchImagesStatus(RequestStatusEnum.PENDING));
        ImageApi.getImages().then(({ images }) => {
            dispatch(setImages(images));
            dispatch(setFetchImagesStatus(RequestStatusEnum.SUCCESS));
        }).catch(err => {
            dispatch(setFetchImagesStatus(RequestStatusEnum.FAILURE));
        });
    }
}

export const saveImage = (fd: FormData): ThunkAction<any, AppState, unknown, ImageActionsTypes> => {
    return async (dispatch, getState) => {
        dispatch(setSaveImageStatus(RequestStatusEnum.PENDING));

        return ImageApi.saveImage(fd).then(({ image }) => {
            const { images } = getState().image;
            const updatedImages = [image, ...images];

            dispatch(setImages(updatedImages));
            dispatch(setSaveImageStatus(RequestStatusEnum.SUCCESS));
        }).catch(err => {
            dispatch(setSaveImageStatus(RequestStatusEnum.FAILURE));
            return err.response.data.message;
        });
    }
}

export type ImageActionsTypes = FetchImagesStatusType | SaveImageStatusType | SetImagesType
