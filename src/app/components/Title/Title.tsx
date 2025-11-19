import { useRouter } from "next/navigation"
import Link from "next/link";

export default function Title(props: any) {

    const router = useRouter();

    const Register = () => {
        router.push('./Register')
    }

    return (
        <div className="grid justify-items-center py-6 sm:py-8 md:py-12 px-4">
            <h1 className="sf-pro-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">{props.titleh1}</h1>
            <p className="toledo text-white text-base sm:text-lg md:text-xl lg:text-2xl my-2 text-center max-w-2xl">
                {props.subtitle} <Link className="border-b cursor-pointer hover:text-gray-300 transition-colors" href={props.link}>{props.linktitle}</Link>
            </p>
        </div>
    )
}