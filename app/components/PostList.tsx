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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR");
}

export function PostList({ posts, showActions, onEdit }: Props) {
  return (
    <ul className="flex flex-col gap-4 px-4 md:px-0 max-w-5xl mx-auto">
      {posts.map((post) => (
        <li key={post.id} className="w-full">
          <Link
            href={`/posts/${post.id}`}
            className="flex w-full items-baseline justify-between underline decoration-red-800"
          >
            <span className="text-xl">{post.title}</span>
            <span className="text-sm">{formatDate(post.createdAt)}</span>
          </Link>

          {showActions && (
            <button
              onClick={() => onEdit?.(post.id)}
              className="ml-4 text-sm text-red-700 hover:underline shrink-0"
            >
              Editar
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
