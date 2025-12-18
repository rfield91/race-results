"use client";

import { upsertOrganization } from "@/app/actions/organization.actions";
import { Button } from "@/components/button/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/library/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/library/ui/field";
import { Input } from "@/components/library/ui/input";
import { Organization } from "@/dto/organizations";
import { ReactElement, useActionState } from "react";

const initialState = {
    isError: false,
    message: "",
};

export const ManageOrgDialog = ({
    org,
    trigger,
}: {
    org?: Organization;
    trigger: ReactElement;
}) => {
    const [state, formAction, pending] = useActionState(
        upsertOrganization,
        initialState
    );

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogTitle>{org ? "Edit" : "Add"} Organization</DialogTitle>

                <form action={formAction} className="flex flex-col gap-2">
                    {state.isError && (
                        <div className="text-red-500">{state.message}</div>
                    )}

                    {org && (
                        <input type="hidden" name="org-id" value={org.orgId} />
                    )}

                    <FieldGroup>
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                type="text"
                                name="org-name"
                                placeholder="Pizza Club"
                                defaultValue={org?.name}
                                required
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose>
                            <Button variant={"ghost"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving…" : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
