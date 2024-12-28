import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav className="relative z-10 px-6 py-4 flex justify-center items-center px-4 py-4">
            <div className="w-full max-w-7xl flex justify-between">
                <div className="flex items-center">
                    <img src="/images/logo-text.svg" alt="Amilek" className="h-8" />
                </div>
                <span className="text-gray-400">Already have an account?
                    <Link className="ml-1 text-teal-400 hover:text-teal-300" to='/'> Sign In</Link>
                </span>
            </div>
        </nav>
    )
}