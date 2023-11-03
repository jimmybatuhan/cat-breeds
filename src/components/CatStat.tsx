import React from "react";
import { Row, Col } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";

const CatStat: React.FC<{ value: number, label: string; }> = ({ value, label }) => {
    return (
        <Row>
            <Col md={6}>{label} :</Col>
            <Col md={6}>{
                Array(value)
                    .fill(null)
                    .map((v, i) => <StarIcon key={i} style={{ color: "#FFD700" }} />
                    )
            }
            </Col>
        </Row>

    );
};

export default CatStat;
