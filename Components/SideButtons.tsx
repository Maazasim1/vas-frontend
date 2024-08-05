import React from 'react'

export default function SideButtons({children,className}:{children:React.ReactElement,className:string}) {
    return (
        <li
            className={`my-2 text-[#f1f1f1] flex flex-row items-center   py-1 rounded-md text-[12px] hover:bg-[#1f1f1f] active:bg-[#1f1f1f] focus:bg-[#1f1f1f] px-1 ${className}`}
        >
            {children}
           
        </li>
    )
}
