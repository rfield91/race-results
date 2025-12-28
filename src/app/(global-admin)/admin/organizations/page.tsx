import { CreateOrgDialog } from "@/components/admin/organizations/create-org-dialog";
import { OrganizationEntry } from "@/components/admin/organizations/organization-entry";
import { Button } from "@/components/button/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/library/ui/table";
import { organizationService } from "@/services/organizations/organization.service";
import { PlusIcon } from "lucide-react";

export default async function Page() {
    const orgs = await organizationService.getAllOrganizations(false);

    return (
        <div className="flex w-full flex-col gap-4">
            <div>
                <CreateOrgDialog
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
                        <OrganizationEntry key={org.orgId} org={org} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
