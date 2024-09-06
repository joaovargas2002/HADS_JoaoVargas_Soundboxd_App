import React, {useContext} from "react";

import { TemaContext } from "../TemaContext/TemaContext";

export default function Tema() {
    const temaContext = useContext(TemaContext);

    if (!temaContext) {
        throw new Error('BotaoAlternarTema deve ser usado dentro de um TemaProvider');
    }

    const { temaEscuro, alternarTema } = temaContext;

    return (
        <button onClick={alternarTema}> 
            { temaEscuro ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro' }
        </button>
    )
}