import React from "react";
import { Row, Col, Container as BSContainer } from "react-bootstrap";

const Container: React.FC<{ children: JSX.Element[] | JSX.Element; }> = ({ children }) => {
    return (
        <BSContainer>
            <Row className="justify-content-md my-3">
                <Col>
                    {children}
                </Col>
            </Row>
        </BSContainer>
    );
};

export default Container;
