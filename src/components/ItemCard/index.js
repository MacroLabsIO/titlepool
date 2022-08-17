import React from "react";
import { Image } from "react-bootstrap";
import './styles.scss';

const ItemCard = React.memo((props) => {

    const { 
        title, 
        thumbnail, 
        username, 
        userAvatar, 
        terrirtory, 
        exhibition, 
        onWallet,
        timeRemaining, 
        onClick, 
        upcoming, 
        onClickFavorite,
        isFavorite 
    } = props;

    return (
        <div className="item-card" onClick={onClick}>
            <Image className="img-fluid" src={thumbnail} />
            <div className="info">
                {upcoming && (
                    <div className="favorite" onClick={onClickFavorite}>
                        {isFavorite ? (
                            <Image src="/bookmark-2.png" />
                        ) : (
                            <Image src="/bookmark-1.png" />
                        )}
                    </div>
                )}
                <div className="d-flex align-items-end mb-1 mt-1">
                    {upcoming && (
                        <h6 className="live-in me-3">Live in</h6>
                    )}
                    {timeRemaining && (
                        <h4 className="timer">{timeRemaining}</h4>
                    )}
                </div>
                <h3 className="title">{title}</h3>
                <div className="d-flex align-items-center mb-2">
                    <Image className="avatar" src={userAvatar} />
                    <h5 className="mb-0 ms-2">{username}</h5>
                </div>
                <h5>Terrirtory: <span>{terrirtory}</span></h5>
                <h5>Exhibition: <span>{exhibition}</span></h5>
            </div>
        </div>
    );
});

export default ItemCard;