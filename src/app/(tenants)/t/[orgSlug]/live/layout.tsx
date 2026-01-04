import { LiveResultsProvider } from "./context/live-results-context";
import { getClassResults, getPaxResults, getRawResults, getRunWork } from "./data/results";
import { DisplayMode } from "./types";
import { requireValidTenant } from "./lib/tenant-guard";
import { LiveLayoutClient } from "./components/live-layout-client";
import { featureFlagsService } from "@/services/feature-flags/feature-flags.service";

export default async function LiveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tenant = await requireValidTenant();

    // Fetch all data on the server in parallel
    // TODO: Get display mode from event/tenant configuration
    const displayMode = DisplayMode.autocross;
    const results = await Promise.all([
        getClassResults(displayMode),
        getPaxResults(),
        getRawResults(),
        getRunWork(),
        tenant.isValid && !tenant.isGlobal && tenant.org
            ? featureFlagsService.getOrgFeatureFlags(tenant.org.orgId)
            : Promise.resolve({}),
    ]);

    const [classResults, paxResults, rawResults, runWork, featureFlags] = results;

    return (
        <LiveResultsProvider
            classResults={classResults}
            paxResults={paxResults}
            rawResults={rawResults}
            runWork={runWork}
            displayMode={displayMode}
            featureFlags={featureFlags}
        >
            <LiveLayoutClient>{children}</LiveLayoutClient>
        </LiveResultsProvider>
    );
}

