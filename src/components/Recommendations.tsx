import { Breed } from "cat/breeds";
import React, { Suspense, lazy, useId } from 'react';
import { Row, Col } from "react-bootstrap";

const CatRecommendation = lazy(() => import("./CatRecommendation"));

const Recommendations: React.FC<{ label: string, breed: Breed[]; }> = ({ label, breed }) => {
    const id = useId();
    return (
        <>
            <h5 className="mb-0">{label}</h5>
            <Row>
                {breed && breed.map((breed) =>
                    <Col md="3" key={`${id}_recommended_${breed.id}`}>
                        <Suspense>
                            <CatRecommendation breed={breed} />
                        </Suspense>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default Recommendations;
