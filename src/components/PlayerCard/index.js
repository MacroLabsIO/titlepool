import React from "react";
import { Image } from "react-bootstrap";
import './styles.scss';

const PlayerCard = React.memo((props) => {

    const { id, name, avatar } = props;

    return (
        <div className="player-card d-flex align-items-center mb-2">
            <h6 className="player-number m-0">{id}</h6>
            <div className="player-avatar">
                <div className="image-filter" style={{ background: "url(" + avatar + ")" }}></div>
                <Image src={avatar} />
            </div>
            <h6 className="player-name m-0">{name}</h6>
        </div>
    );
});

export default PlayerCard;