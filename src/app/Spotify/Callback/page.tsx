"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { setAuthToken } from '@/lib/api';
import { routes } from '@/lib/routes';

export default function SpotifyCallback() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const token = params.get('token');
        const isPopup = window.opener && window.opener !== window;

        if (token) {
            setAuthToken(token);
            console.log('Token salvo com sucesso!');

            if (isPopup) {
                window.opener.postMessage({
                    type: 'SPOTIFY_AUTH_SUCCESS',
                    token
                }, window.location.origin);
                window.close();
            } else {
                router.push(routes.myProfile);
            }
        } else {
            console.error("Token não encontrado na URL!");

            if (isPopup) {
                window.opener.postMessage({
                    type: 'SPOTIFY_AUTH_ERROR'
                }, window.location.origin);
                window.close();
            } else {
                router.push(routes.login);
            }
        }
    }, [router, params]);

    return (
        <div className="text-white p-10">
            Conectando ao Spotify...
        </div>
    );
}
