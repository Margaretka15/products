import React, {useEffect, useState} from 'react';
import {ArrowForwardIosOutlined, ArrowBackIosOutlined} from '@mui/icons-material';
import "../styles/Paginator.scss";


type Props = {
    onClick: React.Dispatch<React.SetStateAction<number>>;
    current: number;
    numberOfPages: number;
}

function Paginator({onClick, current, numberOfPages}: Props) {

    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);

    const goToPrevious = () => {
        if (current > 1) {
            onClick((current) => (current - 1));
        }
    }
    const goToNext = () => {
        if (current < numberOfPages) {
            onClick((current) => (current + 1));
        }
    }
    // odpowiednie wyświetlanie strzałek
    // to do: naprawić zepsute strzałki po odświeżeniu ;)
    useEffect(() => {
        if (current === 1) {
            setIsFirst(true);
        } else if (current === numberOfPages)
            setIsLast(true);
        else {
            setIsLast(false);
            setIsFirst(false);
        }
    }, [current]);

    if (numberOfPages === 1)
        return <></>

    return (
        <div className="navigation">
            {!isFirst ? <div className="navigation__arrow navigation__arrow--backward" onClick={goToPrevious}>
                <ArrowBackIosOutlined/>
            </div> : null}
            {!isLast ? <div className="navigation__arrow navigation__arrow--forward" onClick={goToNext}>
                <ArrowForwardIosOutlined/>
            </div> : null}
        </div>
    );
}

export default Paginator;