"use server";
import { redirect } from "next/navigation";
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
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}

export async function createSnippets(
  formState: { message: string },
  formData: FormData
) {
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
  console.log(snippet, "====");

  //* Redirect the user back to the root route

  redirect("/");
}
