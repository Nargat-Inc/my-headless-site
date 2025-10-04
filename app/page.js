

// app/page.js
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import Image from "next/image";

async function getPosts() {
  const GET_POSTS = gql`
    query AllPosts {
      posts {
        nodes {
          slug
          title
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
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
          <li key={post.slug}>
            <h2>{post.title}</h2>
            {post.featuredImage?.node?.sourceUrl && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={500}
                height={300}
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
