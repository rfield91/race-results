import React, { ComponentProps } from "react";
import { Button as ShadButton } from "../ui/button";

export const Button = ({
    children,
    ...props
}: ComponentProps<typeof ShadButton> & {
    children: React.ReactNode;
}) => {
    return (
        <ShadButton {...props} className="flex items-center cursor-pointer">
            {children}
        </ShadButton>
    );
};
