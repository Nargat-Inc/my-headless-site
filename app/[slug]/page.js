import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";

export default async function Page({ params }) {
  const slug = params.slug;

  const { data } = await client.query({
    query: gql`
      query GetPage($slug: String!) {
        pageBy(uri: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug },
  });

  const page = data?.pageBy;

  if (!page) return <div>Page not found</div>;

  return (
    <main>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
