import React, { useEffect, useState } from 'react';
import { Container, Typography } from "@mui/material";

import { DropFile } from "./components/DropFile/DropFile";

import './App.css';
import { ImageApi } from "./api/image";
import { ImageListWrapper } from "./components/ImageList/ImageList";

function App() {
    const [images, setImages] = useState<Array<ImageType>>([]);
    const [isImagesFetched, setIsImagesFetched] = useState<boolean>(false);

    useEffect(() => {
        ImageApi.getImage().then(data => setImages(data.images));
    }, [])

    return (
        <Container>
            <Typography variant="h2" component="div" align="center" gutterBottom>
                Img BG Delete
            </Typography>

            <DropFile />

            <ImageListWrapper images={images} />
        </Container>
    );
}

export default App;
