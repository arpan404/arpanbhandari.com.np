import getFeaturedProjects from "@/actions/getFeaturedProjects";

export const revalidate = 7200

export async function GET() {
   const data = await getFeaturedProjects();
   return Response.json({
      data: data,
   });
}
