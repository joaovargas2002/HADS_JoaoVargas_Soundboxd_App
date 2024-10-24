"use client"

export default function ButtonSubmit(props:any) {

    return (
        <main>
            <div className="submitt">
                <button className="montserrat border border-white text-white w-96 m-5 p-2 hover:bg-white hover:text-black ">{props.title}</button>
            </div>
        </main>
    )
}