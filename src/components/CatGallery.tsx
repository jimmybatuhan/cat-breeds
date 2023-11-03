import _ from "lodash";
import { Breed, CatImage } from "cat/breeds";
import { Container, Button } from "react-bootstrap";
import React, { Suspense, lazy, useEffect, useState } from 'react';
import useCatImages from "../hooks/useCatImages";

const ImageContainer = lazy(() => import("./ImageContainer"));

const CatGallery: React.FC<{ breed: Breed; }> = ({ breed }) => {
    const [page, setPage] = useState(1);
    const [images, setImages] = useState<CatImage[]>([]);
    const imageCollection = useCatImages(breed.id, page);

    useEffect(() => {
        setPage(1);
        setImages([]);
    }, [breed]);

    useEffect(() => {
        setImages(c => _.unionBy([...c, ...imageCollection], c => c.id));
    }, [imageCollection]);

    return <Container fluid className="mt-3">
        <h4>Images of {breed.name}</h4>
        <div style={{ columnCount: 3 }} className="my-3">
            {images.length >= 1 && images.map(({ url, id }) =>
                <Suspense key={id}>
                    <ImageContainer id={id} url={url} />
                </Suspense>
            )}
        </div>
        <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => setPage(c => c + 1)}>
                Load More
            </Button>
        </div>
    </Container>;
};

export default CatGallery;
