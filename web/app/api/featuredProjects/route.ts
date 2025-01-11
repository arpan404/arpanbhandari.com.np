import getFeaturedProjects from "@/actions/getFeaturedProjects";

export async function GET() {
   const data = await getFeaturedProjects();
   return Response.json({
      data: data,
   });
}
