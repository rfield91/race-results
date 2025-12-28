import React, { ComponentProps } from "react";
import { Button as ShadButton } from "@/components/library/ui/button";

export const Button = ({
    children,
    ...props
}: ComponentProps<typeof ShadButton> & {
    children: React.ReactNode;
}) => {
    return (
        <ShadButton {...props} className="flex cursor-pointer items-center">
            {children}
        </ShadButton>
    );
};
