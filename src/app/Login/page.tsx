"use client"

import Header from "@/app/components/Header/Header"
import Footer from "../components/Footer/Footer"
import InputForm from "../components/InputForm/InputForm"
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit"
import Title from "../components/Title/Title"
import ForgotPassword from "../components/ForgotPassword/ForgotPassword"

export default function Login() {

    return (
        <main className="bg-black h-full">
            <Header />
            
            <div className="main py-32">
                <Title titleh1="Log in or register now." subtitle="Don't have an account yet?" link='/Register' linktitle="Register right now!"/>

                <form className="grid gap-2.5 justify-items-center my-9 h-full" action="">

                    <InputForm type="email" placeholder="Digite seu e-mail"/>

                    <InputForm type="password" placeholder="Digite sua senha"/>

                    <ButtonSubmit title="LOGIN"/>

                    <ForgotPassword />                    
                </form>
            </div>

            <Footer />
        </main>
    )
}