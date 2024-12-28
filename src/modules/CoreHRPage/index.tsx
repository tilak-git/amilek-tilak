import React from 'react';
import { PeoplePage } from "./components/PeoplePage/index.tsx";
import { Sidebar } from "./components/SideBar/index.tsx";

const CoreHRPage = () => {
    return (
        <div className="flex min-h-screen w-full bg-[#1C1C1C]">
            <Sidebar />
            <div className="flex-1">
                <PeoplePage />
            </div>
        </div>

    )
}

export default CoreHRPage;