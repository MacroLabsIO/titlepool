import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './styles.scss';

const BackButton = React.memo((props) => {

    const { onClick } = props;
    const navigate = useNavigate();

    return (
        <Button className="back-button mb-5" onClick={onClick ? onClick : () => navigate(-1) }>
            <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
    );
});

export default BackButton;