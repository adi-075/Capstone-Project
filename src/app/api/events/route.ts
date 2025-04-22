import type { Events } from "@/types/events";

// Define functions to get dates in ISO format (YYYY-MM-DD)
function getCurrentDateISO(): string {
  return new Date().toISOString().split("T")[0];
}

function getDateFromDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

// Default configuration with dynamic dates
const getDefaultConfig = () => ({
  calendarId: "602bf64e-2dad-4996-94d5-158c189ba52c",
  // Start date is today
  startDate: getCurrentDateISO(),
  // End date is 30 days from now
  endDate: getDateFromDaysAgo(-30),
  categoryId: "d346a1d6-3db3-4054-b161-bb1eb358b704",
  additionalParams: {
    limit: "100", // Maximum number of events to return
    sort: "start", // Sort by start date
    order: "asc", // Ascending order (earliest first)
  } as Record<string, string>,
});

export async function GET(): Promise<Response> {
  try {
    // Get fresh config with dynamic dates
    const config = getDefaultConfig();

    const baseUrl = "https://api.calendar.moderncampus.net/pubcalendar/";
    const url = new URL(`${baseUrl}${config.calendarId}/events`);

    // Add query parameters
    url.searchParams.append("start", config.startDate);
    url.searchParams.append("end", config.endDate);

    if (config.categoryId) {
      url.searchParams.append("category", config.categoryId);
    }

    // Add any additional parameters
    if (config.additionalParams) {
      Object.entries(config.additionalParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Fetch data from the API
    const response = await fetch(url.toString());

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `API request failed with status: ${response.status}`,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const data: Events = await response.json();

    // Return the response as JSON
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=60, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch calendar data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
