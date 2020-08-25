import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import logoIcon from '../../assets/images/icons/logo.svg';

import './styles.css';

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const history = useHistory();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
                
       await api.post('/users/login', { 
            email, 
            password,
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            history.push('/home');
        }).catch((error) => {
            alert('Email e senha inválidos');
        })
    }    

    return (
        <div className="container-login">
            <main>
                <form onSubmit={handleSubmit}>
                    <img src={logoIcon} alt="Logo Navers"/>
                    <Input 
                        label="E-mail" 
                        name="Password" 
                        placeholder="E-mail" 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input 
                        label="Senha" 
                        name="password" 
                        placeholder="Senha"
                        type="password"
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <Button value="Entrar" />
                </form>
            </main>
        </div>
    )
}
