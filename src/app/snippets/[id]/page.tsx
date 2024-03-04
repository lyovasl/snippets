import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";

interface SnippetsShowProps {
  params: {
    id: string;
  };
}

const SnippetsShowPage = async (props: SnippetsShowProps) => {
  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippet.findUnique({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>

      <pre className="p-3 rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetsShowPage;
