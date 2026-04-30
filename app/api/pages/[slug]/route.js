import { gql } from "@apollo/client";
import { client } from "../../../../lib/apollo";

export async function GET(req, { params }) {
  const { slug } = await params;
  const token = req.headers.get("x-api-secret");
  if (token !== process.env.API_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await client.query({
      query: gql`
        query GetPage($slug: String!) {
          pageBy(uri: $slug) {
            title
            aboutUsPage {
              heroTitle
              heroDescription1
              heroDescription2
              heroDescription3
              heroImage {
  mediaItemUrl
}
            }
          }
        }
      `,
      variables: { slug },
      fetchPolicy: "no-cache",
    });

    return Response.json(data.pageBy);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
