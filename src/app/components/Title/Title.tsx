import { useRouter } from "next/navigation"
import Link from "next/link";

export default function Title(props: any) {

    const router = useRouter();

    const Register = () => {
        router.push('./Register')
    }

    return (
        <div className="grid justify-items-center py-12">
            <h1 className="sf-pro-bold text-white text-7xl">{props.titleh1}</h1>
            <p className="toledo text-white text-2xl my-2">{props.subtitle} <Link className="border-b cursor-pointer" href={props.link}>{props.linktitle}</Link></p>
        </div>
    )
}