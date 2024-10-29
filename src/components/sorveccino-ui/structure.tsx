import React from 'react';
import { NavBar } from './navbar';

interface StructureProps {
    children: React.ReactNode;
}

export function Structure({ children }: StructureProps) {
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <NavBar />
            <div className="flex flex-col w-full h-[100vh] pt-24">{children}</div>
        </div>
    );
}