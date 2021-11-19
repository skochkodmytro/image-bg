import { FETCH_IMAGES_STATUS, ImageActionsTypes, SAVE_IMAGE_STATUS, SET_IMAGES } from "./image.actions";
import { RequestStatusEnum } from "../../enums";

const initialState = {
    images: [] as Array<ImageType>,
    fetchImagesStatus: null as RequestStatusEnum | null,
    saveImageStatus: null as RequestStatusEnum | null
}

type ImageInitialType = typeof initialState;

export const imageReducer = (state: ImageInitialType = initialState, action: ImageActionsTypes): ImageInitialType => {
    switch (action.type) {
        case SET_IMAGES:
            return { ...state, images: action.images }
        case SAVE_IMAGE_STATUS:
            return { ...state, saveImageStatus: action.status }
        case FETCH_IMAGES_STATUS:
            return { ...state, fetchImagesStatus: action.status }
        default:
            return state
    }
}
