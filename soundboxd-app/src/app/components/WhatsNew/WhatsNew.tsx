export default function WhatsNew() {
    return (
        <div className="grid justify-items-center py-8">
            <div className="grid w-4/5 justify-items-start">
                <h2 className="sf-pro-bold text-base text-white text-3xl">Whats New</h2>
                <p className="sf-pro-medium text-white">This Week...</p>


                <div className="grid grid-cols-6 w-full mt-2 py-2 gap-4">
                    <div className="border-white border h-80"></div>
                    <div className="border-white border h-80"></div>
                    <div className="border-white border h-80"></div>
                    <div className="border-white border h-80"></div>
                    <div className="border-white border h-80"></div>
                    <div className="border-white border h-80"></div>
                </div>
            </div>
        </div>
    )
}