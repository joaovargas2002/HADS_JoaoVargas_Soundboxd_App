'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Props {
  params: { id: string };
}

export default function ProfileDetails({ params }: Props) {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = params.id;

    // Se o ID for 'me', busca o usuário logado
    // Caso contrário, busca o usuário pelo ID
    const endpoint = userId === 'me'
      ? '/api/spotify/me'
      : `/api/users/${userId}`;

    console.log('Buscando perfil:', endpoint);

    api.get(endpoint)
      .then(data => {
        console.log('Dados recebidos:', data);
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar dados:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <>
      <Header />
      <main className="bg-black h-screen w-full pt-2">
        {loading && (
          <div className="text-white text-center p-10">
            <p>Carregando dados do usuário...</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center p-10">
            <p className="text-xl font-bold mb-4">Erro ao carregar dados:</p>
            <p>{error}</p>
            <p className="mt-4 text-sm">Verifique o console do navegador para mais detalhes.</p>
          </div>
        )}

        {!loading && !error && userData && (
          <div className="grid grid-cols-[20%_80%]">
            <div className="profile border-[2px] border-white m-6">
              <div className="foto-perfil">
                <img src={userData.images?.[0]?.url || userData.avatar || ''} alt="Foto" />
              </div>
              <h2 className="text-white">{userData.nome_usuario || userData.nome_completo || 'Nome não disponível'}</h2>
              <p className="text-white">{userData.email || 'Email não disponível'}</p>
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
        )}
      </main>
      <Footer />
    </>
  )
}