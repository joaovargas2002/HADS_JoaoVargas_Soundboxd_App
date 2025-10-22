import Link from "next/link"

export default function Profiles() {
    return (
        <div className="grid justify-items-center py-8">
            <div className="grid w-4/5 justify-items-start">
                <h3 className="sf-pro-bold text-base text-white text-3xl">New Profiles...</h3>

                <div className="grid grid-cols-3 w-full mt-2 py-2 gap-4">
                    <Link href="/Profiles/1">
                        <div className="border-white border h-32 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-white">Usuário #1</span>
                        </div>
                    </Link>
                    <Link href="/Profiles/2">
                        <div className="border-white border h-32 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-white">Usuário #2</span>
                        </div>
                    </Link>
                    <Link href="/Profiles/3">
                        <div className="border-white border h-32 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-white">Usuário #3</span>
                        </div>
                    </Link>
                    <Link href="/Profiles/4">
                        <div className="border-white border h-32 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-white">Usuário #4</span>
                        </div>
                    </Link>
                    <Link href="/Profiles/5">
                        <div className="border-white border h-32 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-white">Usuário #5</span>
                        </div>
                    </Link>
                    <Link href="/Profiles/6">
                        <div className="border-white border h-32 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-white">Usuário #6</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}