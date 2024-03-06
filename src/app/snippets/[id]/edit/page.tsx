import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetsEditForm from "@/components/snippets-edit-form";

interface SnippetsEditProps {
  params: {
    id: string;
  };
}

const SnippetsEditPage = async (props: SnippetsEditProps) => {
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetsEditForm snippet={snippet} />
    </div>
  );
};

export default SnippetsEditPage;
