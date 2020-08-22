import React from 'react';
import { Link } from 'react-router-dom';

import logoIcon from '../../assets/images/icons/logo.svg';

import './styles.css';

export default function Header() {
    return (
        <div className="header-container">
            <img src={logoIcon} alt="Logo Navers"/>
            <Link to="/">
                <p>Sair</p>
            </Link>
        </div>
    )
}
