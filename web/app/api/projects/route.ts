import getProjects from '@/actions/getProjects';

export const revalidate = 7200;

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const tag = searchParams.get('tag');
   const data = await getProjects(tag ? (tag as string) : undefined);
   return new Response(JSON.stringify({
      data: data,
   }), {
      headers: { 'Content-Type': 'application/json' }
   });
}
