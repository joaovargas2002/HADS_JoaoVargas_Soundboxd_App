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

                <InputForm type="text" placeholder="Digite seu nome completo"/>

                <InputForm type="text" placeholder="Digite seu nome de usuário"/>
                
                <InputForm type="text" placeholder="Digite sua nacionalidade"/>
                
                <InputForm type="date" placeholder="Digite sua data de nascimento"/>
                
                <InputForm type="email" placeholder="Digite seu e-mail"/>
                
                <InputForm type="password" placeholder="Digite sua senha"/>

                <InputForm type="password" placeholder="Confirme sua senha"/>

                <ButtonSubmit>CADASTRE-SE</ButtonSubmit>

                <ForgotPassword />
                </form>
            </div>

            <Footer />
        </main>
    )
}