"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SpotifyCallback() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const token = params.get('token'); // Laravel deve redirecionar com ?token=...
        if (token) {
            localStorage.setItem('auth_token', token);
            router.push('/'); // ou qualquer página do app
        } else {
            console.error("Token não encontrado na URL!");
        }
    }, []);

    return (
        <div className="text-white p-10">
            Conectando ao Spotify...
        </div>
    );
}
