export default function Header() {

    return (
        <div className="flex justify-between items-center bg-black border-solid border-b border-white w-full px-16 py-4">
            <div className="flex-none">
                <p className="text-4xl font-custom text-white cursor-pointer">Soundboxd</p>
            </div>

            <div className="flex gap-4">
                <p className="montserrat text-white cursor-pointer">Buscar</p>
                <p className="montserrat text-white cursor-pointer">Profile</p>
                <p className="montserrat text-white cursor-pointer">Entrar</p>
            </div>
        </div>
    )

}

