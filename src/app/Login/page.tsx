"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from "@/app/components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import { routes } from '@/lib/routes';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) {
                return;
            }

            if (event.data.type === 'SPOTIFY_AUTH_SUCCESS') {
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
                        titleh1="Registre-se agora mesmo!"
                        subtitle="Conecte-se com sua conta Spotify para começar."
                        link='/Register'
                    />

                    <div className="grid justify-items-center w-full max-w-md mx-auto">
                        <button
                            type="button"
                            className="text-white border-2 border-white p-2 text-sm sm:text-base hover:text-gray-300 transition-colors"
                            onClick={handleSpotifyLogin}
                        >
                            Conectar ao Spotify
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
