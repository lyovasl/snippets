import Link from "next/link";
import { db } from "@/db";

const Home = async () => {
  const snippets = await db.snippet.findMany({
    where: {
      title: {
        contains: "a",
      },
    },
  });

  const renderdSnippets = snippets.map((snippet) => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
        className="flex justify-between p-2 border rounded items-center"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="my-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href={`/snippets/new`} className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderdSnippets}</div>
    </div>
  );
};

export default Home;
