import getResume from "@/actions/getResume";

export async function GET() {
   const data = await getResume();
   return Response.json({
      data: data,
   });
}
