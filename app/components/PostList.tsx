// components/PostList.tsx
"use client";

import Link from "next/link";

type Post = {
  id: string;
  title: string;
  createdAt: string;
};

type Props = {
  posts: Post[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
};

export function PostList({ posts, showActions, onEdit }: Props) {
  return (
    <ul className="flex flex-col gap-2 max-w-5xl">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex justify-between items-center py-4 px-2 cursor-pointer underline decoration-red-800"
        >
          <Link href={`/posts/${post.id}`} className=" text-">
            {post.title}
          </Link>

          {showActions && (
            <button
              onClick={() => onEdit?.(post.id)}
              className="text-sm text-red-700 hover:underline"
            >
              Editar
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
