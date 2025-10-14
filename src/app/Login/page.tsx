"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from "@/app/components/Header/Header";
import Footer from "../components/Footer/Footer";
import InputForm from "../components/InputForm/InputForm";
import Title from "../components/Title/Title";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

export default function Login() {
    const router = useRouter();

    const handleSpotifyLogin = () => {
        // Abre a página de login do Laravel em nova janela
        window.open("http://127.0.0.1:8000/spotify/login", "_blank", "width=600,height=800");
    };

    return (
        <main className="bg-black h-full">
            <Header />
            <div className="main py-32">
                <Title 
                    titleh1="Log in or register now." 
                    subtitle="Don't have an account yet?" 
                    link='/Register' 
                    linktitle="Register right now!"
                />

                <div className="grid gap-2.5 justify-items-center my-9 h-full">
                    <InputForm type="email" placeholder="Digite seu e-mail"/>
                    <InputForm type="password" placeholder="Digite sua senha"/>
                    
                    <button
                        type="button"
                        className="text-white underline"
                        onClick={handleSpotifyLogin}
                    >
                        Conectar ao Spotify
                    </button>

                    <ForgotPassword />
                </div>
            </div>
            <Footer />
        </main>
    );
}
