import { ManageOrgDialog } from "@/components/admin/organizations/manage-org";
import { OrganizationEntry } from "@/components/admin/organizations/organization-entry";
import { Button } from "@/components/button/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getOrganizations } from "@/lib/organizations/get-organizations";
import { PlusIcon } from "lucide-react";

export default async function Page() {
    const orgs = await getOrganizations();

    return (
        <div className="w-full flex flex-col gap-4">
            <div>
                <ManageOrgDialog
                    trigger={
                        <Button>
                            <PlusIcon />
                            Create Organization
                        </Button>
                    }
                />
            </div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orgs.map((org) => (
                        <OrganizationEntry key={org.org_id} org={org} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
