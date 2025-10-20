# Como Usar o Sistema de Perfis

A estrutura de perfis foi atualizada de `[nickname]` para `[id]` para maior flexibilidade e segurança.

## Estrutura de URLs

### URLs Suportadas

```
/profile/me                    → Perfil do usuário logado
/profile/123                   → Perfil do usuário com ID 123
/profile/123/joao-silva        → Perfil do usuário 123 com slug amigável (recomendado!)
```

## Como Usar

### 1. Acessar o Perfil do Usuário Logado

```typescript
import { routes } from '@/lib/routes';
import Link from 'next/link';

// Com Link do Next.js
<Link href={routes.myProfile}>Meu Perfil</Link>

// Com useRouter
const router = useRouter();
router.push(routes.myProfile);
```

### 2. Acessar Perfil de Outro Usuário

```typescript
import { getProfileUrl } from '@/lib/routes';
import Link from 'next/link';

const user = {
  id: 123,
  name: 'João Silva'
};

// URL simples (apenas ID)
<Link href={getProfileUrl(user.id)}>
  Ver Perfil
</Link>

// URL amigável (ID + slug)
<Link href={getProfileUrl(user.id, user.name)}>
  Ver Perfil de {user.name}
</Link>
// Resultado: /profile/123/joao-silva
```

### 3. Em um Componente de Lista de Usuários

```typescript
import { getProfileUrl } from '@/lib/routes';
import Link from 'next/link';

function UserList({ users }: { users: User[] }) {
  return (
    <div>
      {users.map(user => (
        <Link
          key={user.id}
          href={getProfileUrl(user.id, user.display_name)}
          className="user-card"
        >
          <img src={user.avatar} alt={user.display_name} />
          <h3>{user.display_name}</h3>
        </Link>
      ))}
    </div>
  );
}
```

## Backend (Laravel)

No seu backend, você deve criar rotas para buscar usuários por ID:

```php
// routes/api.php

// Busca o usuário logado (autenticado)
Route::middleware('auth:sanctum')->get('/spotify/me', [SpotifyController::class, 'me']);

// Busca qualquer usuário por ID
Route::get('/users/{id}', [UserController::class, 'show']);
```

### Controller Exemplo

```php
// app/Http/Controllers/UserController.php

public function show($id)
{
    $user = User::findOrFail($id);

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'display_name' => $user->display_name,
        'email' => $user->email,
        'avatar' => $user->avatar,
        // outros campos...
    ]);
}
```

## Helpers Disponíveis

### `slugify(text: string): string`

Converte texto em URL amigável:

```typescript
import { slugify } from '@/lib/routes';

slugify('João Silva')      // 'joao-silva'
slugify('María García')    // 'maria-garcia'
slugify('Test  Multiple')  // 'test-multiple'
```

### `extractUserIdFromUrl(url: string): string`

Extrai o ID de uma URL de perfil:

```typescript
import { extractUserIdFromUrl } from '@/lib/routes';

extractUserIdFromUrl('/profile/123/joao-silva')  // '123'
extractUserIdFromUrl('/profile/123')             // '123'
```

## Migração de Código Antigo

Se você tinha código usando `[nickname]`, atualize assim:

### Antes:
```typescript
// ❌ Antigo
<Link href={`/Profiles/${user.nickname}`}>Perfil</Link>
```

### Depois:
```typescript
// ✅ Novo
import { getProfileUrl } from '@/lib/routes';

<Link href={getProfileUrl(user.id, user.name)}>Perfil</Link>
```

## Vantagens da Nova Estrutura

✅ **IDs imutáveis** - Usuário pode mudar nome/username sem quebrar links
✅ **URLs amigáveis** - Slug torna a URL legível e boa para SEO
✅ **Performático** - Busca direta por ID no banco
✅ **Flexível** - Funciona com ou sem slug
✅ **Profissional** - Padrão usado por grandes aplicações
