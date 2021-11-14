import React from 'react'
import { Box, Typography, Container } from '@mui/material';
import { useDropzone } from 'react-dropzone'

function DropFile() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file, i) => {
        return (
            <li key={i}>
                {(file as any).path} - {file.size} bytes
            </li>
        )
    });

    return (
        <Box
            {...getRootProps()}
            component="div"
            sx={{ p: 2, border: '2px dashed grey' }}
        >
            <input {...getInputProps()} />

            <Typography variant="subtitle1" align="center">
                Drag 'n' drop some files here, or click to select files
            </Typography>
        </Box>
    );
}

export { DropFile }
