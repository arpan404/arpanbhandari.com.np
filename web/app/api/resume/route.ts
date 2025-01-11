import getResume from "@/actions/getResume";

export const revalidate = 7200

export async function GET() {
   const data = await getResume();
   return Response.json({
      data: data,
   });
}
