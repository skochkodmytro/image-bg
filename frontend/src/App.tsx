import React, { useEffect, useState } from 'react';
import { Container, Typography } from "@mui/material";

import { DropFile } from "./components/DropFile/DropFile";
import { ImageListWrapper } from "./components/ImageList/ImageList";

import './App.css';
import { ImageApi } from "./api/image";

function App() {
    const [images, setImages] = useState<Array<ImageType>>([]);

    useEffect(() => {
        ImageApi.getImages().then(data => setImages(data.images));
    }, [])

    const handleSaveImage = (img: ImageType) => {
        const updatedImagesList = [img, ...images];
        setImages(updatedImagesList);
    }

    return (
        <Container>
            <Typography variant="h2" component="div" align="center" gutterBottom>
                Img BG Delete
            </Typography>

            <DropFile saveImage={handleSaveImage} />

            <ImageListWrapper images={images} />
        </Container>
    );
}

export default App;
