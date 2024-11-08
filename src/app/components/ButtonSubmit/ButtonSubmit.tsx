"use client"

import { LayoutProps } from "../../../../.next/types/app/layout"

export default function ButtonSubmit({ children, ...props}: LayoutProps) {

    return (
        <main>
            <div className="submitt">
                <button className="montserrat border border-white text-white w-96 m-5 p-2 hover:bg-white hover:text-black " {...props}>{children}</button>
            </div>
        </main>
    )
}