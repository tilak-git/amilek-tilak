import React from 'react';

export const Sidebar = () => {
    return (
        <div className="fixed left-0 top-0 h-screen w-[80px] bg-[#1B1B1B] border-r border-gray-700">
            {/* Logo */}


            {/* Navigation Links */}
            <nav className="mt-4 flex flex-col items-center">
                <img src="/images/logo.svg" alt="Amilek" className="h-8 mb-4" />
                <SidebarLink icon="/images/home.svg" label="Home" />
                <SidebarLink icon="/images/inbox.svg" label="Inbox" />
                <SidebarLink icon="/images/feed.svg" label="Feed" />
                <SidebarLink icon="/images/chat.svg" label="Chat" />
                <SidebarLink icon="/images/dashboard.svg" label="Dashboard" />
                <SidebarLink icon="/images/corehr.svg" label="Core HR" active />
            </nav>

            {/* Bottom Links */}
            <div className="absolute bottom-2 w-full flex flex-col items-center">
                <SidebarLink icon="/images/help.svg" label="Help" />
                <SidebarLink icon="/images/settings.svg" label="Settings" />
            </div>
        </div>
    );
};

interface SidebarLinkProps {
    icon: string;
    label: string;
    active?: boolean;
}

const SidebarLink = ({ icon, label, active }: SidebarLinkProps) => {
    return (
        <a
            href="#"
            className={`flex flex-col items-center justify-center w-full px-4 py-3 group ${active
                ? 'text-teal-400'
                : 'text-gray-400 hover:bg-teal-400/10'
                }`}
        >
            <img src={icon} alt={label} className={`w-5 h-5 ${active
                ? 'text-teal-400 bg-teal-400/10'
                : 'text-gray-400 hover:bg-gray-800'
                }`} />
            <span className="text-xs mt-1">{label}</span>
        </a>
    );
};