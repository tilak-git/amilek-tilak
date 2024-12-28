import React from 'react';

interface EmployeeCardProps {
    name: string;
    role: string;
    email: string;
    phone: string;
    salary: string;
    joinedDate: string;
    image: string;
    key?: string
}

export const EmployeeCard = ({ name, role, email, phone, salary, joinedDate, image }: EmployeeCardProps) => {
    return (
        <div className="bg-[#1B1B1B] border border-[#FFFFFF0D] rounded-xl p-1 pt-4 hover:bg-[#2A2A2A] transition-colors duration-200 w-full">
            {/* Header */}
            <div className="flex items-start gap-3 px-3 sm:px-4">
                <img
                    src={image || '/images/user1.svg'}
                    alt={name}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg object-cover"
                />
                <div className="min-w-0">
                    <h3 className="text-white text-base sm:text-lg font-medium truncate">{name}</h3>
                    <p className="text-[#666666] text-sm truncate">{role}</p>
                </div>
            </div>

            {/* Contact Info */}
            <div className="mt-4 sm:mt-6 space-y-2 px-3 sm:px-4">
                <div className="flex items-center gap-2">
                    <img src="/images/email.svg" alt="Email" className="w-4 h-4 shrink-0" />
                    <span className="text-[#666666] text-sm truncate">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src="/images/phone.svg" alt="Phone" className="w-4 h-4 shrink-0" />
                    <span className="text-[#666666] text-sm truncate">{phone}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 p-2 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#202020] gap-2">
                <div className="text-[#808080] font-medium text-base sm:text-lg">
                    {salary}
                </div>
                <div className="text-[#4D4D4D] text-xs sm:text-sm">
                    Joined on {joinedDate}
                </div>
            </div>
        </div>
    );
};