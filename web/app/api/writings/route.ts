import getWritingCards from '@/actions/getWritingCards';

export const revalidate = 7200;

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const type = searchParams.get('type');
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
