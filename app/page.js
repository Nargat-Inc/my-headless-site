// app/page.js
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

async function getPosts() {
  const GET_POSTS = gql`
    query AllPosts {
      posts {
        nodes {
          slug
          title
        }
      }
    }
  `;
  const { data } = await client.query({ query: GET_POSTS });
  return data.posts.nodes;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <h1>My Headless Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
