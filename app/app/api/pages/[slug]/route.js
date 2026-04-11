import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";

export async function GET(req, { params }) {
  const token = req.headers.get("x-api-secret");
  if (token !== process.env.API_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await client.query({
    query: gql`
      query GetPage($slug: String!) {
        pageBy(uri: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug: params.slug },
  });

  return Response.json(data.pageBy);
}
