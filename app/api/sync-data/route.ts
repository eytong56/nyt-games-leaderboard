import { syncData } from '@/app/lib/services';
import { dateToStringLocal, getOffsetDate } from '@/app/lib/utils';
import type { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const today = new Date();
  const endDate = dateToStringLocal(today)
  const startDate = dateToStringLocal(getOffsetDate(today, -99)); // Last 100 days

  const result = await syncData({startDate, endDate});

  return Response.json({ success: true, stats: result.stats });
}