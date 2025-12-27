// app/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getPost } from "@/app/lib/api/post";
import { PostList } from "@/app/components/PostList";

export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost().then((res) => setPosts(res));
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-10">
      <PostList posts={posts} />
    </section>
  );
}
