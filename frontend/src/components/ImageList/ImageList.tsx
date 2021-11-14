import React, { FC } from "react";
import { ImageList, ImageListItem  } from '@mui/material'

import { IMAGE_PATH_PREFIX } from "../../constants/urls";

type OwnTypes = {
    images: Array<ImageType>
}

export const ImageListWrapper: FC<OwnTypes> = ({ images }) => {
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.map((item: any) => (
                <ImageListItem key={item._id}>
                    <img
                        src={`${IMAGE_PATH_PREFIX}${item.url}`}
                        alt={item.name}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}
