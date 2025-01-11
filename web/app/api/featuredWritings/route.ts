import getFeaturedWritings from "@/actions/getFeaturedWritings";


export const revalidate = 7200

export async function GET() {
   const data = await getFeaturedWritings();
   return Response.json({
      data: data,
   });
}
