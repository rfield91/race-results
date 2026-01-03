import { Button } from "@/components/button/button";
import Link from "next/link";
import { ComponentProps } from "react";

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
