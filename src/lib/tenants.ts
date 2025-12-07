export const VALID_TENANTS: string[] = [
    "ner",
    "ne-svt",
    "boston-bmw"
] as const;

export function isValidTenant(slug: string) {
    return VALID_TENANTS.includes(slug);
}