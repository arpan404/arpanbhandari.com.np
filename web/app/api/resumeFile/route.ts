import getResume from '@/actions/getResume';

export async function GET(request: Request) {
   const data = await getResume();
   if (!data) {
      return new Response(
         JSON.stringify({
            error: 'No data found',
         }),
         {
            headers: { 'Content-Type': 'application/json' },
         }
      );
   }
   const { searchParams } = new URL(request.url);
   const token = searchParams.get('token');
   if (!token || token !== process.env.NEXT_PUBLIC_INTERNAL_API_TOKEN) {
      return new Response(
         JSON.stringify({
            error: 'Invalid token',
         }),
         {
            headers: { 'Content-Type': 'application/json' },
         }
      );
   }
   const resumeUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL! + data?.resume.file?.url;
   const pdfResponse = await fetch(resumeUrl);
   if (!pdfResponse.ok) {
      return new Response(
         JSON.stringify({
            error: 'Failed to fetch resume PDF',
         }),
         {
            headers: { 'Content-Type': 'application/json' },
         }
      );
   }

   const pdfBuffer = await pdfResponse.arrayBuffer();
   return new Response(pdfBuffer, {
      headers: {
         'Content-Type': 'application/pdf',
         'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
   });
}
