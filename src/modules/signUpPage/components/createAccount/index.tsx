import toast from "react-hot-toast";
import { SignUpForm } from "./singUpForm.tsx";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        toast.success('Login successful!');
        navigate('/people');
    };

    const handleLoginError = (error: string) => {
        toast.error(error);
    };

    return (
        <div className="relative z-10 flex justify-center items-center px-4 pt-8 max-md:mb-8">
            <div className="w-full max-w-7xl bg-[#1E1E1E]/80 backdrop-blur-sm rounded-[32px] p-16 pb-16 md:pb-0 border border-[#FFFFFF1A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <img src="/images/logo-text.svg" alt="Amilek" className="h-8 mb-10" />
                        <h1 className="text-4xl font-bold text-white mb-2">Create an account</h1>
                        <p className="text-gray-400 text-lg mb-16">Sign up with the details provided & get started.</p>

                        <div className="relative bottom-0">
                            <img src="/images/home-form-bg.png" alt="bg-svg" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <SignUpForm
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
