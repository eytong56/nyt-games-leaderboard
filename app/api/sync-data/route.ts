import { syncData } from '@/app/lib/services';
import { dateToStringUTC, getOffsetDate } from '@/app/lib/utils';
import type { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const today = new Date();
  const endDate = dateToStringUTC(getOffsetDate(today, 1)) // One day after
  const startDate = dateToStringUTC(getOffsetDate(today, -6)); // Last 7 days

  const result = await syncData({startDate, endDate});

  return Response.json({ success: true, stats: result.stats });
}