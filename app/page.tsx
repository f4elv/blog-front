"use client";

import { useState, useEffect } from "react";
import { getPost } from "./lib/api/post";
import { PostList } from "./components/PostList";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost().then((res) => setPosts(res));
  }, []);

  return (
    <main className="max-w-5xl mx-auto py-10">
      <h1 className="text-center font-extrabold text-3xl mb-10">
        Rossin Blog's
      </h1>
      <PostList posts={posts} />
    </main>
  );
}
