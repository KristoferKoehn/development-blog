import React, { ReactNode } from "react";

export default function ContentBlock({
 className = "",
 id,
 children,
}: {
 className?: string;
 id?: string;
 children: ReactNode;
}) {
 return (
 <div
 id={id}
 className={`bg-white rounded-xl shadow-md p-8 mb-4 ${className}`}
 >
 {children}
 </div>
 );
}