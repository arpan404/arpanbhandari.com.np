import getMusic from "@/actions/getMusic";

export const revalidate = 7200

export async function GET() {
   const data = await getMusic();
   return Response.json({
      data: data,
   });
}