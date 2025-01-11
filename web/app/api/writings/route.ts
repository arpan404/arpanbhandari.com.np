import getWritingCards from '@/actions/getWritingCards';

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const type = searchParams.get('type');
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
   const data = await getWritingCards(type ? (type as string) : undefined);
   return new Response(
      JSON.stringify({
         data: data,
      }),
      {
         headers: { 'Content-Type': 'application/json' },
      }
   );
}
