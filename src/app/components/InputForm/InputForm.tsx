"use client"

export default function InputForm({children , ...props}: React.InputHTMLAttributes<HTMLInputElement>) {

    return (
        <div className="grid">
            <label className="montserrat text-white" htmlFor="">{children}</label>
            <input className="montserrat bg-black border border-white text-white w-96" {...props} >{children}</input>
    </div>
    )

}