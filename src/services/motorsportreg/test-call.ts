/**
 * Test script for MotorsportReg API call
 * Run with: npx tsx src/services/motorsportreg/test-call.ts
 */

import { motorsportRegService } from "./motorsportreg.service";
import "dotenv/config";

async function testGetOrganizationCalendar() {
    const orgId = "A78865E1-0976-8954-9FE6082B7B7590E9";

    console.log(`Testing getOrganizationCalendar for orgId: ${orgId}`);
    console.log("---");

    try {
        const response = await motorsportRegService.getOrganizationCalendar(orgId, {
            exclude_cancelled: true,
        });

        console.log("✅ Success!");
        console.log(`Found ${response.response.events.length} events`);
        console.log("\nEvents:");
        response.response.events.forEach((event, index) => {
            console.log(`\n${index + 1}. ${event.name}`);
            console.log(`   Type: ${event.type}`);
            console.log(`   Venue: ${event.venue.name}, ${event.venue.city}, ${event.venue.region}`);
            console.log(`   Dates: ${event.start} - ${event.end}`);
            console.log(`   URL: ${event.detailuri}`);
        });

        // Return the response for further inspection
        return response;
    } catch (error) {
        console.error("❌ Error:", error);
        if (error instanceof Error) {
            console.error("Message:", error.message);
            if ("statusCode" in error) {
                console.error("Status Code:", (error as { statusCode?: number }).statusCode);
            }
        }
        throw error;
    }
}

// Run the test
testGetOrganizationCalendar()
    .then(() => {
        console.log("\n---");
        console.log("Test completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n---");
        console.error("Test failed!");
        process.exit(1);
    });

