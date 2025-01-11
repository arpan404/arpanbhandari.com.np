import getFeaturedSkills from "@/actions/getFeaturedSkills";

export const revalidate = 7200

export async function GET() {
   const data = await getFeaturedSkills();
   return Response.json({
      data: data,
   });
}
