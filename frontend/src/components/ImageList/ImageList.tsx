import React, { FC } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Grid,
    Typography
} from '@mui/material'

import { HOST } from "../../constants/urls";

type OwnTypes = {
    images: Array<ImageType>
}

export const ImageListWrapper: FC<OwnTypes> = ({ images }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems="stretch">
                {images.map((image: ImageType) => (
                    <Grid key={image._id} item xs={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                image={`${HOST}/${image.url}`}
                                alt={image.name}
                            />
                            <Box sx={{ flex: 1 }}>
                                <CardContent>
                                    <Typography gutterBottom component="div">
                                        {image.name}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardActions>
                                <Button>Download</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
