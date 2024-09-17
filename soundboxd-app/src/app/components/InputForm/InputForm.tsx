"use client"

export default function InputForm(props:any) {

    return (
        <div className="grid">
            <label className="montserrat text-white" htmlFor="">{props.name}</label>
            <input className="montserrat bg-black border border-white text-white w-96" type="text" />
        </div>
    )

}