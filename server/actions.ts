"use server"
import { revalidatePath } from "next/cache";
import { db } from ".";
import { blogTable } from "./schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const getPosts = async () => {
  const posts = await db.query.blogTable.findMany();

  if (posts.length === 0) {
    return { error: "No Post Found!" };
  }

  return { success: posts };
};

export const createPost = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const body = formData.get("body")?.toString();

  if (!title || !body) {
    return { error: "Title and body are required." };
  }

  await db.insert(blogTable).values({ title, body });
  revalidatePath("/");
  redirect("/");

//   return { success: "Created New Post successfully" };
};

export const getPostById = async (id: number) => {
    
    if (isNaN(id)) {
        return { error: "Invalid post Id"}
    }

    const post = await db.query.blogTable.findFirst({
        where: eq(blogTable.id, id)
    })

    if (!post) {
        return { error: "Post not found" }
    }

    return {success: post}
}


export const deletePost = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  if (isNaN(id)) {
    throw new Error("Invalid Post ID"); 
  }

  await db.delete(blogTable).where(eq(blogTable.id, id));
  revalidatePath("/");
  redirect("/")

}

export const updatePost = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  const title = formData.get("title")?.toString();
  const body = formData.get("body")?.toString();

  if (!title || !id || !body) {
     return "Invalid Post"
  }

  await db.update(blogTable).set({ title, body }).where(eq(blogTable.id, id))
  revalidatePath("/")
  redirect("/")
  
}