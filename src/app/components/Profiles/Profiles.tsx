'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { getRecentUsers, followUser, unfollowUser, checkIfFollowing } from '@/lib/api';

interface User {
  id: number;
  nome: string;
  foto_perfil: string | null;
  is_following?: boolean;
}

export default function Profiles() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [followingStates, setFollowingStates] = useState<Record<number, boolean>>({});
    const [loadingFollow, setLoadingFollow] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                setLoading(true);
                const data = await getRecentUsers(6);
                const usersData = data.users || [];
                setUsers(usersData);
                
                const followStates: Record<number, boolean> = {};
                await Promise.all(
                    usersData.map(async (user: User) => {
                        try {
                            const response = await checkIfFollowing(user.id);
                            followStates[user.id] = response.is_following || false;
                        } catch (err) {
                            followStates[user.id] = false;
                        }
                    })
                );
                setFollowingStates(followStates);
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

    const handleFollowToggle = async (userId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setLoadingFollow(prev => ({ ...prev, [userId]: true }));

        try {
            if (followingStates[userId]) {
                await unfollowUser(userId);
                setFollowingStates(prev => ({ ...prev, [userId]: false }));
            } else {
                await followUser(userId);
                setFollowingStates(prev => ({ ...prev, [userId]: true }));
            }
        } catch (err) {
            console.error('Erro ao seguir/deixar de seguir:', err);
        } finally {
            setLoadingFollow(prev => ({ ...prev, [userId]: false }));
        }
    };

    if (loading) {
        return (
            <div className="grid justify-items-center py-8">
                <div className="grid w-4/5 justify-items-start">
                    <h3 className="sf-pro-bold text-white text-3xl">Novos Perfis...</h3>
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
                    <h3 className="sf-pro-bold text-white text-3xl">Novos Perfis...</h3>
                    <p className="text-red-500 mt-4">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid justify-items-center py-8">
            <div className="grid w-4/5 justify-items-start">
                <h3 className="sf-pro-bold text-white text-3xl">Novos Perfis...</h3>

                <div className="grid grid-cols-3 w-full mt-2 py-2 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="border-white border h-32 hover:bg-white/10 hover:border-green-500 transition-all duration-300 cursor-pointer relative group">
                            <Link href={`/Profiles/${user.id}`} className="flex items-center p-4 gap-4 h-full">
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
                                <div className="flex flex-col justify-center overflow-hidden flex-1">
                                    <h4 className="text-white font-bold text-lg truncate">
                                        {user.nome}
                                    </h4>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => handleFollowToggle(user.id, e)}
                                disabled={loadingFollow[user.id]}
                                className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                                    followingStates[user.id]
                                        ? 'bg-gray-700 text-white hover:bg-red-600 hover:text-white'
                                        : 'bg-white text-black hover:bg-green-500 hover:text-white'
                                } ${loadingFollow[user.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loadingFollow[user.id] ? '...' : followingStates[user.id] ? 'Seguindo' : 'Seguir'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}