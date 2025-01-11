import getFeaturedSkills from "@/actions/getFeaturedSkills";

export async function GET() {
   const data = await getFeaturedSkills();
   return Response.json({
      data: data,
   });
}
