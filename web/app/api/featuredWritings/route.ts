import getFeaturedWritings from "@/actions/getFeaturedWritings";

export async function GET() {
   const data = await getFeaturedWritings();
   return Response.json({
      data: data,
   });
}
