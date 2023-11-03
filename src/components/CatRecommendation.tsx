import _ from "lodash";
import { Breed, CatImage } from "cat/breeds";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import useCatContext from "../hooks/useCatContext";
import useCatImages from "../hooks/useCatImages";

const CatRecommendation: React.FC<{ breed: Breed; }> = ({ breed }) => {
    const navigator = useNavigate();
    const { setBreedImageUrl, setSelectedBreed } = useCatContext();
    const [recommendedCatImage, setRecommendedCatImage] = useState<CatImage>();
    const imageCollection = useCatImages(breed.id, 1);
    const handleSelectBreed = () => {
        if (recommendedCatImage) {
            setSelectedBreed(breed);
            setBreedImageUrl(recommendedCatImage.url);
            navigator(`/${recommendedCatImage.id}`, {
                replace: true
            });
        }
    };

    useEffect(() => {
        setRecommendedCatImage(_.first(imageCollection));
    }, [imageCollection, breed]);

    return recommendedCatImage && (
        <Card as="div" onClick={handleSelectBreed}>
            <Image src={recommendedCatImage.url} />
            <Card.Body className="p-1">
                <Card.Text>{breed.name}</Card.Text>
            </Card.Body>
        </Card >
    );
};

export default CatRecommendation;
