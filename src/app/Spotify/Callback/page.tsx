"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { setAuthToken } from '@/lib/api';
import { routes } from '@/lib/routes';

export default function SpotifyCallback() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const token = params.get('token'); // Laravel deve redirecionar com ?token=...
        if (token) {
            // Salva o token usando o utilitário centralizado
            setAuthToken(token);
            console.log('Token salvo com sucesso!');

            // Redireciona para o perfil do usuário logado
            router.push(routes.myProfile);
        } else {
            console.error("Token não encontrado na URL!");
            // Redireciona para login em caso de erro
            router.push(routes.login);
        }
    }, [router, params]);

    return (
        <div className="text-white p-10">
            Conectando ao Spotify...
        </div>
    );
}
