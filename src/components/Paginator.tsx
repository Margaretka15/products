import React, {useEffect, useState} from 'react';

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

    return (
        <div>
            {!isFirst ? <div onClick={goToPrevious}>
                previous
            </div> : null}
            {!isLast ? <div onClick={goToNext}>
                next
            </div> : null}
        </div>
    );
}

export default Paginator;