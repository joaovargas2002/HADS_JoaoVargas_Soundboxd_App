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
                <Title titleh1="Register right now" subtitle="Its Free!" link="" linktitle=""/>

                <form className="grid gap-2.5 justify-items-center my-10 h-full" action="">

                <InputForm name="Nome Completo"/>

                <InputForm name="Nome de Usuário"/>
                
                <InputForm name="Nacionalidade (opcional)"/>
                
                <InputForm name="Data de Nascimento"/>
                
                <InputForm name="Endereço de E-mail"/>
                
                <InputForm name="Senha"/>

                <InputForm name="Confirmação de Senha"/>

                <ButtonSubmit title="CADASTRAR"/>

                <ForgotPassword />
                </form>
            </div>

            <Footer />
        </main>
    )
}