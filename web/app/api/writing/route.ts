import getWriting from '@/actions/getWriting';

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const uid = searchParams.get('uid');
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
