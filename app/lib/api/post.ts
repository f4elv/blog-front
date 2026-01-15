import { fetcher } from "../fetcher";
import { postSchema } from "../schemas/post";

export async function createPost(input: unknown) {
  const parsed = postSchema.safeParse(input);

  if (!parsed.success) {
    throw parsed.error;
  }

  const response = await fetcher("/posts", {
    method: "POST",
    auth: true,
    body: JSON.stringify(parsed.data),
  });

  return response;
}

export async function getPost() {
  const response = await fetcher("/posts", {
    method: "GET",
  });

  return response.posts;
}

export async function getPostById(id: string) {
  console.log(id);
  const response = await fetcher(`/posts/${id}`, {
    method: "GET",
  });

  return response;
}

export async function deletePost(id: string) {
  const response = await fetcher(`/posts/${id}`, {
    method: "DELETE",
    auth: true,
  });

  return response;
}

export async function updatePost(id: string, input: unknown) {
  const parsed = postSchema.safeParse(input);

  if (!parsed.success) {
    throw parsed.error;
  }

  const response = await fetcher(`/posts/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(parsed.data),
  });

  return response;
}
