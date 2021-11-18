import React, { FC, useState } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone'

import { ImageApi } from "../../api/image";
import './DropFile.css';

type OwnProps = {
    saveImage: (img: ImageType) => void
}

export const DropFile: FC<OwnProps> = ({ saveImage }) => {
    const [isSendingImage, setIsSendingImage] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, // If drop more than 1 file throw error(run onDropRejected)
        multiple: false,
        accept: 'image/jpeg',
        onDropRejected: (fileRejections) => {
            enqueueSnackbar(fileRejections[0].errors[0].message, { variant: 'error' });
        },
        onDropAccepted: (files) => {
            setIsSendingImage(true);

            const file = files[0];
            const fd = new FormData();
            fd.append('image', file);

            ImageApi.saveImage(fd)
                .then(({ image }) => {
                    saveImage(image);
                    setIsSendingImage(false);
                })
                .catch((err: Error) => {
                    enqueueSnackbar(err.message, { variant: 'error' });
                    setIsSendingImage(false);
                });
        }
    });

    return (
        <Box
            {...getRootProps()}
            component="div"
            sx={{ p: 2, border: '2px dashed grey', position: 'relative' }}
        >
            <input {...getInputProps({ disabled: isSendingImage })}/>

            <Typography variant="subtitle1" align="center" sx={{ cursor: 'pointer' }}>
                {isSendingImage ? 'Loading...' : 'Drop file here'}
            </Typography>

            {
                isSendingImage &&
                <Box className="progress-wrapper">
                    <LinearProgress />
                </Box>
            }
        </Box>
    );
}
