'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/api";
import { routes } from "@/lib/routes";

/**
 * Página de redirecionamento automático
 * Se o usuário está logado -> redireciona para /Profiles/me
 * Se não está logado -> redireciona para /Login
 */
export default function ProfilesPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(routes.myProfile);
    } else {
      router.push(routes.login);
    }
  }, [router]);

  return (
    <div className="bg-black min-h-screen w-full flex items-center justify-center">
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p className="text-xl">Redirecionando...</p>
      </div>
    </div>
  );
}
