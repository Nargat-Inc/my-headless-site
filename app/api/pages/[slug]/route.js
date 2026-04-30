export async function GET(req, { params }) {
  const { slug } = await params;
  const token = req.headers.get("x-api-secret");
  if (token !== process.env.API_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = `
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
  `;

  const res = await fetch(process.env.WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { slug } }),
  });

  const { data } = await res.json();
  return Response.json(data.pageBy);
}
