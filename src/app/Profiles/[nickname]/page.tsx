interface Props {
    params: {nickname: string};

}

export default function profileDetails({ params }: Props) {
    return (
        <>
            <h1>Perfil: {params.nickname}</h1>
        </>
    )

}