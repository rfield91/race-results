import Link from "next/link";
import React, { ComponentProps } from "react";
import { Button } from "../button/button";

export const LinkButton = ({
    href,
    children,
    ...props
}: ComponentProps<typeof Button> & {
    href: string;
    children: React.ReactNode;
}) => {
    return (
        <Button {...props}>
            <Link href={href} className="flex items-center gap-2">
                {children}
            </Link>
        </Button>
    );
};
