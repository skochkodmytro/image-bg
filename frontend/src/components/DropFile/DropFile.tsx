import React, { FC } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone'

import { saveImage } from "../../store/image/image.actions";

import { RequestStatusEnum } from "../../enums";
import './DropFile.css';
import { AppState } from "../../store/rootStore";

export const DropFile: FC = () => {
    const dispatch = useDispatch();
    const saveImageStatus = useSelector<AppState, RequestStatusEnum | null>(store => store.image.saveImageStatus);
    const { enqueueSnackbar } = useSnackbar();

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, // If drop more than 1 file throw error(run onDropRejected)
        multiple: false,
        accept: 'image/jpeg',
        onDropRejected: (fileRejections) => {
            enqueueSnackbar(fileRejections[0].errors[0].message, { variant: 'error' });
        },
        onDropAccepted: async (files) => {
            const file = files[0];
            const fd = new FormData();
            fd.append('image', file);

            const errMessage = await dispatch(saveImage(fd));
            if (errMessage) {
                enqueueSnackbar(errMessage, { variant: 'error' });
            }
        }
    });

    const isSavingImage = saveImageStatus === RequestStatusEnum.PENDING;

    return (
        <Box
            {...getRootProps()}
            component="div"
            sx={{ p: 2, border: '2px dashed grey', position: 'relative' }}
        >
            <input {...getInputProps({ disabled: isSavingImage })}/>

            <Typography variant="subtitle1" align="center" sx={{ cursor: 'pointer' }}>
                {isSavingImage ? 'Loading...' : 'Drop file here'}
            </Typography>

            {
                isSavingImage &&
                <Box className="progress-wrapper">
                    <LinearProgress />
                </Box>
            }
        </Box>
    );
}
