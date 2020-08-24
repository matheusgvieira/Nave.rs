import React from 'react';
import { Link } from 'react-router-dom';

import logoIcon from '../../assets/images/icons/logo.svg';

import './styles.css';

export default function Header() {

    function handleLogout(){
        localStorage.clear();
    }

    return (
        <div className="header-container">
            <img src={logoIcon} alt="Logo Navers"/>
            <Link to="/" onClick={handleLogout} >
                <p>Sair</p>
            </Link>
        </div>
    )
}
