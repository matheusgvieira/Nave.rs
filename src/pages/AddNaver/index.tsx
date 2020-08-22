import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import backIcon from '../../assets/images/icons/back.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

export default function AddNaver() {
    const [name, setName] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [idade, setIdade] = useState<number>();
    const [companyTime, setCompanyTime] = useState<string>('');
    const [projectsParticipated, setProjectsParticipated] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const history = useHistory();

    function createNaver(e: FormEvent){
        e.preventDefault();

        console.log({
            name,
            office,
            idade,
            companyTime,
            projectsParticipated,
            avatar,
        })
    }

    function handleBackHome(){
        history.push('/home');
    }

    return (
        <div className="add-naver-container">
            <header>
                <Header />
            </header>

            <main>
               <div className="form-naver">
                    <div className="title">
                        <button type="button" onClick={handleBackHome}>
                            <img src={backIcon} alt="Botão de Voltar"/>
                        </button>
                        <h1>Adicionar Naver</h1>
                    </div>
                    <form onSubmit={createNaver}>
                        <div className="input-field">
                            <Input 
                                label="Nome" 
                                name="name" 
                                placeholder="Nome"
                                onChange={e => setName(e.target.value)} 
                            />
                            <Input 
                                label="Cargo" 
                                name="office" 
                                placeholder="Cargo"
                                onChange={e => setOffice(e.target.value)} 
                            />
                            <Input 
                                label="Idade" 
                                name="old" 
                                placeholder="Idade"
                                onChange={e => setIdade(+e.target.value)} 
                            />
                            <Input 
                                label="Tempo de Empresa" 
                                name="company-time" 
                                placeholder="Tempo de Empresa"
                                onChange={e => setCompanyTime(e.target.value)} 
                            />
                            <Input 
                                label="Projetos que participou" 
                                name="projects-participated" 
                                placeholder="Projetos que participou"
                                onChange={e => setProjectsParticipated(e.target.value)} 
                            />
                            <Input 
                                label="URL da foto do naver" 
                                name="avatar"
                                placeholder="URL da foto do naver"
                                onChange={e => setAvatar(e.target.value)}  
                            />
                        </div>
                        <div className="button-container">
                            <Button value="Salvar" type="submit"/>
                        </div>
                    </form>
               </div>
            </main>
        </div>
    )
}
