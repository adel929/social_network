import React from 'react';
import preloader from '../../../images/Preloader.png';
import css from './Preloader.module.css';


let Preloader = props => {
    return <div>
        <img className={css.preloader} src={preloader} />
    </div>
}

export default Preloader;