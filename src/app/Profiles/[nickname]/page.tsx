'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
  params: { nickname: string };

}

export default function profileDetails({ params }: Props) {
  // const [spotifyUser, setSpotifyUser] = useState<any>(null);
  // const [playlists, setPlaylists] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchSpotifyData = async () => {
  //     try {
  //       const resUser = await fetch("http://localhost:8000/api/spotify/me", { credentials: "include" });
  //       const userData = await resUser.json();
  //       setSpotifyUser(userData);

  //       const resPlaylists = await fetch("http://localhost:8000/api/spotify/playlists", { credentials: "include" });
  //       const playlistData = await resPlaylists.json();
  //       setPlaylists(playlistData.items || []);
  //     } catch (err) {
  //       console.error("Erro ao carregar dados do Spotify", err);
  //     }
  //   };

  //   fetchSpotifyData();
  // }, []);

  // if (!spotifyUser) return <p>Carregando...</p>;
  return (
    <>
      <Header />
      <main className="bg-black h-screen w-full pt-2">

        <div className="grid grid-cols-[20%_80%]">
          <div className="profile border-[2px] border-white m-6">
            <div className="foto-perfil">
              <img src={''} alt="Foto" />
            </div>
            <h2>Joao</h2>
            <p>levargas2002@outlook.com</p>

          </div>
          <div className="atividade flex flex-col">
            <div className="botoes border-[2px] border-white m-6">
              <div className="flex justify-start m-4">
                <button className="text-white border-[2px] border-white sf-pro-bold p-2">CRIAR LISTA</button>
              </div>
            </div>
            <h2 className="text-white sf-pro-bold text-lg m-6">MINHA ATIVIDADE</h2>
            <div className="border-[2px] border-white mx-6">
              <div className="grid "></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}