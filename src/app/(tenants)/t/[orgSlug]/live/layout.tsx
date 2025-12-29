import { LiveResultsProvider } from "./context/live-results-context";
import { getClassResults, getPaxResults, getRawResults, getRunWork } from "./api/results";
import { DisplayMode } from "./types";
import { requireValidTenant } from "./lib/tenant-guard";
import { LiveLayoutClient } from "./components/live-layout-client";

export default async function LiveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireValidTenant();

    // Fetch all data on the server in parallel
    // TODO: Get display mode from event/tenant configuration
    const displayMode = DisplayMode.autocross;
    const [classResults, paxResults, rawResults, runWork] = await Promise.all([
        getClassResults(displayMode),
        getPaxResults(),
        getRawResults(),
        getRunWork(),
    ]);

    return (
        <LiveResultsProvider
            classResults={classResults}
            paxResults={paxResults}
            rawResults={rawResults}
            runWork={runWork}
            displayMode={displayMode}
        >
            <LiveLayoutClient>{children}</LiveLayoutClient>
        </LiveResultsProvider>
    );
}

