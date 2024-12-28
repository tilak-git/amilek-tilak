import { CreateAccount } from "./components/createAccount/index.tsx";
import { NavBar } from "./components/Navbar/index.tsx";

const SignUpPage = () => {
    return (
        <div className="min-h-screen relative mt-4 mb-10">
            {/* Grid Background */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[#1C1C1C]"
                    style={{
                        backgroundImage: `
                linear-gradient(to bottom, rgba(33, 141, 111, 0) 71.06%, #3C8A7D 143.11%),
                linear-gradient(#2A2A2A 1px, transparent 1px),
                linear-gradient(90deg, #2A2A2A 1px, transparent 1px)
              `,
                        backgroundSize: '100% 100%, 40px 40px, 40px 40px'
                    }}
                />
            </div>
            <NavBar />
            <CreateAccount />
        </div>

    )
}

export default SignUpPage;