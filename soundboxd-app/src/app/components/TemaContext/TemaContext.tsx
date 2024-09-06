import React, { createContext, ReactNode, useState } from "react";

interface TemaContextProps {
    temaEscuro: boolean;
    alternarTema: () => void;
}

export const TemaContext = createContext<TemaContextProps | undefined>(undefined);

interface TemaProviderProps {
    children: ReactNode;
}

export function TemaProvider({ children }: TemaProviderProps) {

        const [temaEscuro, setTemaEscuro] = useState(false);

        const alternarTema = () => {
            setTemaEscuro(!temaEscuro)
        }

        return (
            <TemaContext.Provider value={{ temaEscuro, alternarTema }}>
                {children}
            </TemaContext.Provider>
        )
}