import getMusic from "@/actions/getMusic";

export async function GET() {
   const data = await getMusic();
   return Response.json({
      data: data,
   });
}