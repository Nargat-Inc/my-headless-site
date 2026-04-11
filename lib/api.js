const BASE = process.env.HEADLESS_API_URL;
const SECRET = process.env.API_SECRET;

export async function getPage(slug) {
  const res = await fetch(`${BASE}/pages/${slug}`, {
    cache: "no-store",
    headers: { "x-api-secret": SECRET },
  });
  return res.json();
}
