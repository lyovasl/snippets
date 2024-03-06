"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";

// const editSnippet = async (id: number, code: string) => {
//   await db.snippet.update({
//     where: { id },
//     data: { code },
//   });
//   redirect(`/snippets/${id}`);
// };

// export default editSnippet;

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
}

export async function createSnippets(
  formState: { message: string },
  formData: FormData
) {
  try {
    //* check the users inputs and make sure they re valid
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer*",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer*",
      };
    }

    //* create a new record in the database

    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong....",
      };
    }
  }
  //* Redirect the user back to the root route
  revalidatePath("/");
  redirect("/");
}
