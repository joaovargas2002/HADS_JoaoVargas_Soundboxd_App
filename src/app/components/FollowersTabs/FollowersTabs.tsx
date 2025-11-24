'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getUserFollowers, getUserFollowing, followUser, unfollowUser, checkIfFollowing, getUser } from '@/lib/api';

interface User {
  id: number;
  nome: string;
  email: string;
  foto_perfil: string | null;
}

interface FollowersTabsProps {
  userId: number;
}

export default function FollowersTabs({ userId }: FollowersTabsProps) {
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingStates, setFollowingStates] = useState<Record<number, boolean>>({});
  const [loadingFollow, setLoadingFollow] = useState<Record<number, boolean>>({});
  const currentUser = getUser();

  useEffect(() => {
    loadFollowData();
  }, [userId]);

  const loadFollowData = async () => {
    setLoading(true);
    try {
      const [followersData, followingData] = await Promise.all([
        getUserFollowers(userId),
        getUserFollowing(userId),
      ]);

      const followersList = followersData.followers || [];
      const followingList = followingData.following || [];

      setFollowers(followersList);
      setFollowing(followingList);

      // Verificar status de seguimento para cada usuário
      const allUsers = [...followersList, ...followingList];
      const followStates: Record<number, boolean> = {};
      
      await Promise.all(
        allUsers.map(async (user) => {
          if (user.id !== currentUser?.id) {
            try {
              const response = await checkIfFollowing(user.id);
              followStates[user.id] = response.is_following || false;
            } catch (err) {
              followStates[user.id] = false;
            }
          }
        })
      );
      
      setFollowingStates(followStates);
    } catch (err) {
      console.error('Erro ao carregar dados de seguimento:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (targetUserId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingFollow(prev => ({ ...prev, [targetUserId]: true }));

    try {
      if (followingStates[targetUserId]) {
        await unfollowUser(targetUserId);
        setFollowingStates(prev => ({ ...prev, [targetUserId]: false }));
      } else {
        await followUser(targetUserId);
        setFollowingStates(prev => ({ ...prev, [targetUserId]: true }));
      }
      
      loadFollowData();
    } catch (err) {
      console.error('Erro ao seguir/deixar de seguir:', err);
    } finally {
      setLoadingFollow(prev => ({ ...prev, [targetUserId]: false }));
    }
  };

  const renderUserList = (users: User[]) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-white p-4 animate-pulse bg-gray-800 h-24"></div>
          ))}
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          <p>Nenhum usuário encontrado</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border border-white p-4 hover:bg-white/10 transition-all duration-300 relative group">
            <Link href={`/Profiles/${user.id}`} className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                {user.foto_perfil ? (
                  <Image
                    src={user.foto_perfil}
                    alt={user.nome}
                    fill
                    className="object-cover rounded-full"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {user.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg">{user.nome}</h4>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </Link>
            
            {currentUser && currentUser.id !== user.id && (
              <button
                onClick={(e) => handleFollowToggle(user.id, e)}
                disabled={loadingFollow[user.id]}
                className={`absolute top-4 right-4 px-4 py-2 text-sm font-bold rounded transition-all duration-200 ${
                  followingStates[user.id]
                    ? 'bg-gray-700 text-white hover:bg-red-600'
                    : 'bg-white text-black hover:bg-green-500 hover:text-white'
                } ${loadingFollow[user.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loadingFollow[user.id] ? '...' : followingStates[user.id] ? 'Seguindo' : 'Seguir'}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-2 border-white p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('followers')}
          className={`pb-2 px-4 font-bold transition-all ${
            activeTab === 'followers'
              ? 'text-white border-b-2 border-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Seguidores ({followers.length})
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`pb-2 px-4 font-bold transition-all ${
            activeTab === 'following'
              ? 'text-white border-b-2 border-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Seguindo ({following.length})
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === 'followers' ? renderUserList(followers) : renderUserList(following)}
      </div>
    </div>
  );
}
