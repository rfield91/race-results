"use client";

import { updateOrganization } from "@/app/actions/organization.actions";
import { Button } from "@/components/library/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/library/ui/card";
import { Checkbox } from "@/components/library/ui/checkbox";

import { Field, FieldGroup, FieldLabel } from "@/components/library/ui/field";
import { Input } from "@/components/library/ui/input";
import { Textarea } from "@/components/library/ui/textarea";

import { Organization } from "@/dto/organizations";
import { nameof } from "@/lib/utils";
import { useActionState } from "react";

export const UpdateOrgForm = ({ org }: { org: Organization }) => {
    const [state, formAction, pending] = useActionState(updateOrganization, {
        isError: false,
        message: "",
    });

    return (
        <Card className="w-full ">
            <CardHeader>
                <CardTitle>Organization Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    {state.isError && (
                        <div className="text-red-500">{state.message}</div>
                    )}

                    <input
                        type="hidden"
                        name={nameof<Organization>("orgId")}
                        value={org.orgId}
                    />

                    <FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel
                                    htmlFor={nameof<Organization>("name")}
                                >
                                    Name
                                </FieldLabel>
                                <Input
                                    type="text"
                                    id={nameof<Organization>("name")}
                                    name={nameof<Organization>("name")}
                                    defaultValue={org.name}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel
                                    htmlFor={nameof<Organization>("slug")}
                                >
                                    URL Slug
                                </FieldLabel>
                                <Input
                                    className="bg-gray-100 pointer-events-none"
                                    type="text"
                                    id={nameof<Organization>("slug")}
                                    name={nameof<Organization>("slug")}
                                    defaultValue={org.slug}
                                    readOnly
                                />
                            </Field>
                            <Field className="col-span-2">
                                <FieldLabel
                                    htmlFor={nameof<Organization>(
                                        "description"
                                    )}
                                >
                                    Description
                                </FieldLabel>
                                <Textarea
                                    defaultValue={org.description || ""}
                                    id={nameof<Organization>("description")}
                                    name={nameof<Organization>("description")}
                                ></Textarea>
                            </Field>
                            <Field orientation="horizontal">
                                <Checkbox
                                    defaultChecked={org.isPublic}
                                    id={nameof<Organization>("isPublic")}
                                    name={nameof<Organization>("isPublic")}
                                />
                                <FieldLabel
                                    htmlFor={nameof<Organization>("isPublic")}
                                >
                                    Publicly Viewable
                                </FieldLabel>
                            </Field>
                        </div>
                        <Field orientation="horizontal">
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={pending}>
                                {pending ? "Saving…" : "Save"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};
