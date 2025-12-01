'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface Album {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  artists: { name: string }[];
  release_date: string;
  external_urls: { spotify: string };
  total_tracks: number;
}

export default function WhatsNew() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const response = await api.get('/spotify/new-releases');
                setAlbums(response.albums?.items?.slice(0, 6) || []);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar novos lançamentos:', err);
                setError('Não foi possível carregar os novos lançamentos');
            }
        };

        fetchNewReleases();
    }, []);

    if (error) {
        return (
            <div className="grid justify-items-center py-8">
                <div className="grid w-4/5 justify-items-start">
                    <h2 className="sf-pro-bold text-white text-3xl">O Que Há de Novo</h2>
                    <p className="sf-pro-medium text-white">Esta Semana...</p>
                    <p className="text-red-500 mt-4">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid justify-items-center py-8">
            <div className="grid w-4/5 justify-items-start">
                <h2 className="sf-pro-bold text-white text-3xl">O Que Há de Novo</h2>
                <p className="sf-pro-medium text-white">Esta Semana...</p>

                <div className="grid grid-cols-6 w-full mt-2 py-2 gap-4">
                    {albums.map((album) => (
                        <Link
                            key={album.id}
                            href={album.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="relative h-80 overflow-hidden rounded-lg border-2 border-white hover:border-green-500 transition-all duration-300">
                                {album.images[0] && (
                                    <Image
                                        src={album.images[0].url}
                                        alt={album.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                    <h3 className="text-white font-bold text-sm line-clamp-2">
                                        {album.name}
                                    </h3>
                                    <p className="text-gray-300 text-xs mt-1">
                                        {album.artists.map(a => a.name).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}