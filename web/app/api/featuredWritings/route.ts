import getFeaturedWritings from "@/actions/getFeaturedWritings";

export async function GET(request: Request) {
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
   const data = await getFeaturedWritings();
   return Response.json({
      data: data,
   });
}
