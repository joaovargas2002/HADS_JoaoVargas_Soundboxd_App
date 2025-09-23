"use client"

import Header from "@/app/components/Header/Header"
import Footer from "../components/Footer/Footer"
import InputForm from "../components/InputForm/InputForm"
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit"
import Title from "../components/Title/Title"
import ForgotPassword from "../components/ForgotPassword/ForgotPassword"

export default function Login() {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://127.0.0.1:8000/callback"; // Laravel route
    const scopes = [
            "playlist-read-private",
            "playlist-modify-public",
        ];

        const loginUrl =
            "https://accounts.spotify.com/authorize" +
            "?response_type=code" +
            "&client_id=" + clientId +
            "&scope=" + encodeURIComponent(scopes.join(" ")) +
            "&redirect_uri=" + encodeURIComponent(redirectUri);

    return (
        <main className="bg-black h-full">
            <Header />
            
            <div className="main py-32">
                <Title titleh1="Log in or register now." subtitle="Don't have an account yet?" link='/Register' linktitle="Register right now!"/>

                <form className="grid gap-2.5 justify-items-center my-9 h-full" action="">

                    <InputForm type="email" placeholder="Digite seu e-mail"/>

                    <InputForm type="password" placeholder="Digite sua senha"/>

                     <a className="text-white" href={loginUrl}>Login com Spotify</a>

                    <ForgotPassword />                    
                </form>
            </div>

            <Footer />
        </main>
    )
}