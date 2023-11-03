import { Suspense, lazy } from 'react';
import Container from "../components/Container";
import useCatContext from "../hooks/useCatContext";
import { Card } from "react-bootstrap";

const CatBreedDropdown = lazy(() => import("../components/CatBreedDropdown"));
const CatGallery = lazy(() => import("../components/CatGallery"));

const Home = () => {
    const { selectedBreed } = useCatContext();

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Suspense>
                        <CatBreedDropdown />
                        {selectedBreed && <CatGallery breed={selectedBreed} />}
                    </Suspense>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
