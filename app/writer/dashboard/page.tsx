// app/writer/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getPost } from "@/app/lib/api/post";
import { PostList } from "@/app/components/PostList";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { writerLogout } from "@/app/lib/api/auth";

export default function WriterDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost().then((res) => setPosts(res));
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-10 flex flex-col gap-6">
      <div className="flex justify-between">
        <Button onClick={() => router.push("/writer/write")}>
          Escrever post
        </Button>

        <Button variant="secondary" onClick={writerLogout}>
          Logout
        </Button>
      </div>

      <PostList
        posts={posts}
        showActions
        onEdit={(id) => router.push(`/writer/edit/${id}`)}
      />
    </section>
  );
}
