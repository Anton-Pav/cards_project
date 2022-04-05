import React, {ReactChild, ReactChildren} from 'react';
import s from './Modal.module.css';


interface AuxProps {
    setModal: (modal: any) => void
    children: ReactChild | ReactChildren;
}


const Modal: React.FC<AuxProps> = (props) => {
    return (
            <div className={`${s.myModal} ${s.active}`} onClick={() => props.setModal('')}>
                {props.children}
            </div>

    );
};

export default Modal;
