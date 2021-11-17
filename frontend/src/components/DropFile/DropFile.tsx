import React, { FC } from 'react'
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone'

import { ImageApi } from "../../api/image";

type OwnProps = {
    saveImage: (img: ImageType) => void
}

export const DropFile: FC<OwnProps> = ({ saveImage }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, // If drop more than 1 file throw error(run onDropRejected)
        multiple: false,
        accept: 'image/jpeg',
        onDropRejected: (fileRejections) => {
            enqueueSnackbar(fileRejections[0].errors[0].message, { variant: 'error' });
        },
        onDropAccepted: (files) => {
            const file = files[0];
            const fd = new FormData();
            fd.append('image', file);

            ImageApi.saveImage(fd)
                .then(({ image }) => saveImage(image))
                .catch((err: Error) => {
                    enqueueSnackbar(err.message, { variant: 'error' });
                });
        }
    });

    return (
        <Box
            {...getRootProps()}
            component="div"
            sx={{ p: 2, border: '2px dashed grey' }}
        >
            <input {...getInputProps()}/>

            <Typography variant="subtitle1" align="center">
                Drag 'n' drop some files here, or click to select files
            </Typography>
        </Box>
    );
}
