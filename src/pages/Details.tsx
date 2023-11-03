import _ from "lodash";
import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import { Suspense, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import useCatContext from "../hooks/useCatContext";
import useCatRecommendation from "../hooks/useCatRecommendation";

const Recommendations = lazy(() => import("../components/Recommendations"));
const CatStat = lazy(() => import("../components/CatStat"));

const Details = () => {
    const navigator = useNavigate();
    const { selectedBreed, breedImageUrl } = useCatContext();

    /** add more if needed... */
    const otherChildFriendly = useCatRecommendation(
        (breeds) => breeds.filter((breed) =>
            _.gte(breed.adaptability, selectedBreed?.child_friendly) &&
            !_.isEqual(breed.id, selectedBreed?.id)
        )
    );
    const otherDogFriendly = useCatRecommendation(
        (breeds) => breeds.filter((breed) =>
            _.gte(breed.social_needs, selectedBreed?.dog_friendly) &&
            !_.isEqual(breed.id, selectedBreed?.id)
        )
    );

    useEffect(() => {
        if (_.isNull(selectedBreed)) navigator("/");
    }, [selectedBreed, navigator]);

    return selectedBreed && (
        <Container>
            <Row>
                <Col>
                    <>{!_.isUndefined(breedImageUrl) &&
                        <div className="p-3 mb-3 bg-black">
                            <Image fluid src={breedImageUrl} />
                        </div>
                    }</>
                </Col>
                <Col xs={6}>
                    <Stack gap={2}>
                        <Card.Title as="h1">{selectedBreed.name} ({selectedBreed.origin})</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{selectedBreed.temperament}</Card.Subtitle>
                        <Card body>
                            {selectedBreed?.description}
                            <div className="mt-2 mb-0">
                                See also:{" "}
                                {selectedBreed.wikipedia_url &&
                                    <>
                                        <a target="_blank" href={selectedBreed.wikipedia_url}>Wikipedia</a>{" "}
                                    </>
                                }
                                {selectedBreed.vetstreet_url &&
                                    <>
                                        <a target="_blank" href={selectedBreed.vetstreet_url}>VetStreet</a>{" "}
                                    </>
                                }
                                {selectedBreed.cfa_url &&
                                    <a target="_blank" href={selectedBreed.cfa_url}>CFA</a>
                                }
                            </div>

                        </Card>
                        <Card body className="mb-2">
                            <Stack gap={3}>
                                <Suspense>
                                    <CatStat label="Adaptability" value={selectedBreed.adaptability} />
                                    <CatStat label="Social Needs" value={selectedBreed.social_needs} />
                                    <CatStat label="Energy Level" value={selectedBreed.energy_level} />
                                    <CatStat label="Child Friendly" value={selectedBreed.child_friendly} />
                                    <CatStat label="Stranger Friendly" value={selectedBreed.stranger_friendly} />
                                    <CatStat label="Dog Friendly" value={selectedBreed.dog_friendly} />
                                </Suspense>
                            </Stack>
                        </Card>
                        <Suspense>
                            {otherDogFriendly &&
                                <Recommendations label="Dog friendly cats" breed={otherDogFriendly} />
                            }
                            {otherChildFriendly &&
                                <Recommendations label="Child friendly cats" breed={otherChildFriendly} />
                            }
                        </Suspense>
                        <button className="mt-2" onClick={() => navigator(-1)}>Browse</button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Details;
