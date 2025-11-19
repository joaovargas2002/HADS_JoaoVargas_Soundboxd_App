export default function Footer() {
    return (
        <div className="bg-black border-t border-white px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4">
            <div className="flex gap-2 sm:gap-3 md:gap-4 toledo text-white text-base sm:text-lg md:text-xl lg:text-2xl cursor-pointer flex-wrap justify-center sm:justify-start">
                <p className="hover:text-gray-300 transition-colors">Twitter</p>
                <p className="hover:text-gray-300 transition-colors">Facebook</p>
                <p className="hover:text-gray-300 transition-colors">Instagram</p>
            </div>
        </div>
    )
}