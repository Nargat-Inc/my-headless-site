
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import Image from "next/image";
import Link from "next/link";

async function getPosts() {
  const GET_POSTS = gql`
    query AllPosts {
      posts {
        nodes {
          id
          slug
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    const { data } = await client.query({ 
      query: GET_POSTS,
      fetchPolicy: "no-cache",
    });
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("GraphQL Error:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "40px" }}>My Headless Blog</h1>
      
      {posts.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#666" }}>No posts found. Create some posts in WordPress!</p>
      ) : (
        <div style={{ display: "grid", gap: "40px" }}>
          {posts.map((post) => (
            <article 
              key={post.id} 
              style={{ 
                border: "1px solid #e0e0e0", 
                padding: "30px", 
                borderRadius: "12px",
                transition: "box-shadow 0.3s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              <Link 
                href={`/posts/${post.slug}`} 
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2 style={{ 
                  fontSize: "2rem", 
                  marginBottom: "15px",
                  color: "#111",
                  cursor: "pointer"
                }}>
                  {post.title}
                </h2>
              </Link>
              
              {post.featuredImage?.node?.sourceUrl && (
                <Link href={`/posts/${post.slug}`}>
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={post.featuredImage.node.mediaDetails?.width || 800}
                    height={post.featuredImage.node.mediaDetails?.height || 600}
                    style={{ 
                      width: "100%", 
                      height: "auto", 
                      marginBottom: "20px", 
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  />
                </Link>
              )}
              
              <div 
                dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                style={{ 
                  lineHeight: "1.8", 
                  marginBottom: "20px",
                  color: "#555"
                }}
              />
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link 
                  href={`/posts/${post.slug}`} 
                  style={{ 
                    color: "#0070f3", 
                    textDecoration: "none",
                    fontWeight: "600"
                  }}
                >
                  Read full article →
                </Link>
                
                <span style={{ color: "#999", fontSize: "14px" }}>
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}