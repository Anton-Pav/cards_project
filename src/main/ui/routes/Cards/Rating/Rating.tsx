import React from 'react';
import s from './Rating.module.scss'

type PropsType = {
    value: number
}

export function Rating({value}: PropsType) {
    return (
        <div className={s.rating}>
            <Star selected={value > 0} />
            <Star selected={value > 1} />
            <Star selected={value > 2} />
            <Star selected={value > 3} />
            <Star selected={value > 4} />
        </div>
    );
}

type StarType = {
    selected: boolean
}

function Star(props: StarType) {
    return <span className={`${s.star} ${props.selected ? s.active : ""}`}>
    </span>
}

