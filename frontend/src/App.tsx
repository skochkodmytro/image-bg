import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";

import { DropFile } from "./components/DropFile/DropFile";
import { ImageListWrapper } from "./components/ImageList/ImageList";

import { ImageApi } from "./api/image";

import { fetchImages } from "./store/image/image.actions";

import { AppState } from "./store/rootStore";
import './App.css';

function App() {
    const dispatch = useDispatch();
    const images = useSelector<AppState, Array<ImageType>>(store => store.image.images);

    useEffect(() => {
        dispatch(fetchImages());
        ImageApi.pingServer().then(data => {
            console.log(data);
        })
    }, [])

    return (
        <Container>
            <Typography variant="h2" component="div" align="center" gutterBottom>
                Img BG Delete
            </Typography>

            <DropFile />

            <Box sx={{ my: 5 }}>
                <ImageListWrapper images={images} />
            </Box>
        </Container>
    );
}

export default App;
