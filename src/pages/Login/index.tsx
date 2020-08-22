import React, { useState, FormEvent } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoIcon from '../../assets/images/icons/logo.svg';

import './styles.css';

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log({
            email, 
            password,
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
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <Button value="Entrar" />
                </form>
            </main>
        </div>
    )
}
