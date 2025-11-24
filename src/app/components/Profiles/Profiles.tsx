'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { getRecentUsers } from '@/lib/api';

interface User {
  id: number;
  nome: string;
  foto_perfil: string | null;
}

export default function Profiles() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                setLoading(true);
                const data = await getRecentUsers(6);
                setUsers(data.users || []);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar usuários recentes:', err);
                setError('Não foi possível carregar os usuários');
            } finally {
                setLoading(false);
            }
        };

        fetchRecentUsers();
    }, []);

    if (loading) {
        return (
            <div className="grid justify-items-center py-8">
                <div className="grid w-4/5 justify-items-start">
                    <h3 className="sf-pro-bold text-white text-3xl">New Profiles...</h3>
                    <div className="grid grid-cols-3 w-full mt-2 py-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border-white border h-32 animate-pulse bg-gray-800"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid justify-items-center py-8">
                <div className="grid w-4/5 justify-items-start">
                    <h3 className="sf-pro-bold text-white text-3xl">New Profiles...</h3>
                    <p className="text-red-500 mt-4">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid justify-items-center py-8">
            <div className="grid w-4/5 justify-items-start">
                <h3 className="sf-pro-bold text-white text-3xl">New Profiles...</h3>

                <div className="grid grid-cols-3 w-full mt-2 py-2 gap-4">
                    {users.map((user) => (
                        <Link key={user.id} href={`/Profiles/${user.id}`}>
                            <div className="border-white border h-32 hover:bg-white/10 hover:border-green-500 transition-all duration-300 cursor-pointer flex items-center p-4 gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    {user.foto_perfil ? (
                                        <Image
                                            src={user.foto_perfil}
                                            alt={user.nome}
                                            fill
                                            className="object-cover rounded-full"
                                            sizes="80px"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                                            <span className="text-white text-2xl font-bold">
                                                {user.nome.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center overflow-hidden">
                                    <h4 className="text-white font-bold text-lg truncate">
                                        {user.nome}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}