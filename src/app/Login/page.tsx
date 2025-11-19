"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from "@/app/components/Header/Header";
import Footer from "../components/Footer/Footer";
import InputForm from "../components/InputForm/InputForm";
import Title from "../components/Title/Title";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import { routes } from '@/lib/routes';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) {
                return;
            }

            if (event.data.type === 'SPOTIFY_AUTH_SUCCESS') {
                console.log('Autenticação do Spotify bem-sucedida!');
                router.push(routes.myProfile);
            } else if (event.data.type === 'SPOTIFY_AUTH_ERROR') {
                console.error('Erro na autenticação do Spotify');
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [router]);

    const handleSpotifyLogin = () => {
        window.open("http://127.0.0.1:8000/spotify/login", "_blank", "width=600,height=800");
    };

    return (
        <main className="bg-black min-h-screen flex flex-col">
            <Header />
            <div className="main flex-1 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="w-full">
                    <Title
                        titleh1="Log in or register now."
                        subtitle="Don't have an account yet?"
                        link='/Register'
                        linktitle="Register right now!"
                    />

                    <div className="grid gap-3 sm:gap-4 md:gap-2.5 justify-items-center my-6 sm:my-8 md:my-9 w-full max-w-md mx-auto">
                        <InputForm type="email" placeholder="Digite seu e-mail"/>
                        <InputForm type="password" placeholder="Digite sua senha"/>

                        <button
                            type="button"
                            className="text-white underline text-sm sm:text-base hover:text-gray-300 transition-colors"
                            onClick={handleSpotifyLogin}
                        >
                            Conectar ao Spotify
                        </button>

                        <ForgotPassword />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
