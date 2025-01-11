import getResume from '@/actions/getResume';

export async function GET(request: Request) {
   const data = await getResume();
   const { searchParams } = new URL(request.url);
   const token = searchParams.get('token');
   if (!token || token !== process.env.NEXT_INTERNAL_API_TOKEN) {
      return new Response(
         JSON.stringify({
            error: 'Invalid token',
         }),
         {
            headers: { 'Content-Type': 'application/json' },
         }
      );
   }
   return Response.json({
      data: data,
   });
}
