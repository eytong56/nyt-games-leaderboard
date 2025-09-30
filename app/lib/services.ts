"use server";

const BASE = "https://www.nytimes.com/svc/crosswords";

// startDate and endDate INCLUSIVE
export async function syncData(startDate: string, endDate: string) {
  try {
    const params = new URLSearchParams({
      publish_type: "mini",
      sort_order: "asc",
      sort_by: "print_date",
      date_start: startDate,
      date_end: endDate,
    });
    const url = new URL(`${BASE}/v3/puzzles.json?${params}`);

    const response = await fetch(url, {
      headers: {
        Cookie: `NYT-S=${process.env.NYT_TOKEN_0}; nyt-gdpr=0`,
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Sync error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// export async function syncData() {

// }
