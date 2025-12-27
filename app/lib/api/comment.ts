import { fetcher } from "../fetcher";
import { commentSchema, CommentInput } from "../schemas/comment";

export async function createComment(postId: string, input: CommentInput) {
  const parsed = commentSchema.safeParse(input);

  if (!parsed.success) throw parsed.error;

  const response = await fetcher(`/comment/${postId}`, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  return response;
}
