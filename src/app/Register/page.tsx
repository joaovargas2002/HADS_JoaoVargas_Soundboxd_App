"use client"

import Header from "@/app/components/Header/Header"
import Footer from "../components/Footer/Footer"
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit"
import InputForm from "../components/InputForm/InputForm"
import Title from "../components/Title/Title"
import ForgotPassword from "../components/ForgotPassword/ForgotPassword"

export default function Login() {
    return (
        <main className="bg-black">
            <Header />

            <div className="main py-12">
                <Title titleh1="Cadastre-se agora" subtitle="É gratis!" link="" linktitle=""/>

                <form className="grid gap-2.5 justify-items-center my-10 h-full" action="">

                <InputForm name="Nome Completo" type="text"/>

                <InputForm name="Nome de Usuário" type="text"/>
                
                <InputForm name="Nacionalidade (opcional)" type="text"/>
                
                <InputForm name="Data de Nascimento" type="date"/>
                
                <InputForm name="Endereço de E-mail" type="email"/>
                
                <InputForm name="Senha" type="password"/>

                <InputForm name="Confirmação de Senha" type="password"/>

                <ButtonSubmit title="CADASTRAR"/>

                <ForgotPassword />
                </form>
            </div>

            <Footer />
        </main>
    )
}