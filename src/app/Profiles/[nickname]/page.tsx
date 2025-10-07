'use client'

import { useEffect } from "react";
import { useState } from "react";

interface Props {
    params: {nickname: string};

}

export default function profileDetails({ params }: Props) {
  const [spotifyUser, setSpotifyUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const resUser = await fetch("http://localhost:8000/api/spotify/me", { credentials: "include" });
        const userData = await resUser.json();
        setSpotifyUser(userData);

        const resPlaylists = await fetch("http://localhost:8000/api/spotify/playlists", { credentials: "include" });
        const playlistData = await resPlaylists.json();
        setPlaylists(playlistData.items || []);
      } catch (err) {
        console.error("Erro ao carregar dados do Spotify", err);
      }
    };

    fetchSpotifyData();
  }, []);

  if (!spotifyUser) return <p>Carregando...</p>;
    return (
        <>
            <div className="bg-black h-screen w-full">
                <div className="grid grid-cols-[25%_75%]">
                    <div className="profile">
                        <div className="foto-perfil">
                            {spotifyUser && (
                                <img src={spotifyUser.images?.[0]?.url || '/default-profile.png'} alt="Foto" />
                            )}
                        </div>
                        <h2>{spotifyUser.display_name}</h2>
                        <p>{spotifyUser.email}</p>

                    </div>
                    <div className="atividade">

                    </div>
                </div>
            </div>
        </>
    )

}