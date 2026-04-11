import { getPage } from "@/lib/api";

export default async function Page({ params }) {
  const page = await getPage(params.slug);

  if (!page) return <div>Page not found</div>;

  return (
    <main>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
