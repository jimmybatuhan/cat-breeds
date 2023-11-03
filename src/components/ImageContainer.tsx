import React, { useState } from 'react';
import { Image, Placeholder } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCatContext from "../hooks/useCatContext";

const ImageContainer: React.FC<{ id: string, url: string; }> = ({ id, url }) => {
    const navigator = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const { setBreedImageUrl } = useCatContext();
    const handleSelectBreed = () => {
        setBreedImageUrl(url);
        navigator(id);
    };

    return <div>
        {!isLoaded && <Placeholder animation="glow" as="p" className="mb-3">
            <Placeholder xs={12} style={{ height: 500 }} />
        </Placeholder>}
        <div
            onClick={handleSelectBreed}
            style={{ display: !isLoaded ? "none" : "block", cursor: "pointer" }}
            className="p-3 mb-3 bg-black"
        >
            <Image onLoad={() => setIsLoaded(true)} src={url} fluid />
        </div>
    </div>;
};

export default ImageContainer;
