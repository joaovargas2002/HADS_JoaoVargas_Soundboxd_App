import Link from "next/link"

export default function Profiles() {
    return (
        <div className="grid justify-items-center py-8">
            <div className="grid w-4/5 justify-items-start">
                <h3 className="sf-pro-bold text-base text-white text-3xl">New Profiles...</h3>

                <div className="grid grid-cols-3 w-full mt-2 py-2 gap-4">
                <Link href="/Profiles/joao" target='_blank'>
                    <div className="border-white border h-32"></div>
                </Link>
                <Link href="/Profiles/cleber" target='_blank'>
                    <div className="border-white border h-32"></div>
                </Link>
                <Link href="/Profiles/jorge" target='_blank'>
                    <div className="border-white border h-32"></div>
                </Link>
                <Link href="/Profiles/awddwa" target='_blank'>
                    <div className="border-white border h-32"></div>
                </Link>
                 
                    <div className="border-white border h-32"></div>
                    <div className="border-white border h-32"></div>
                </div>
            </div>
        </div>
    )
}