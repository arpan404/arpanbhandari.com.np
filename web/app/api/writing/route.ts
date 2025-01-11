import getWriting from '@/actions/getWriting';

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const uid = searchParams.get('uid');
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
   if (!uid) {
      return Response.json({
         data: null,
      });
   }

   const data = await getWriting(uid);
   return Response.json({
      data: data,
   });
}
