import { LinkButton } from "@/components/link-button/link-button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Organization } from "@/types/organizations";
import { PencilIcon } from "lucide-react";

export const OrganizationEntry = ({ org }: { org: Organization }) => {
    return (
        <TableRow key={org.org_id}>
            <TableCell>{org.name}</TableCell>
            <TableCell className="flex justify-end">
                <LinkButton
                    variant={"outline"}
                    href={`/admin/organizations/${org.slug}`}
                >
                    <PencilIcon />
                </LinkButton>
            </TableCell>
        </TableRow>
    );
};
