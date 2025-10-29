import CustomButton from "@/components/custom-button";
import { deletePost, getPostById } from "@/server/actions/post";
import Link from "next/link";

type BlogDetailProps = {
  params: {
    id: string;
  };
};

async function BlogDetail({ params }: BlogDetailProps) {
  const { id } = await params;
  const { success } = await getPostById(Number(id));

  if (!success) {
    return (
      <div className="text-center text-gray-500 mt-10">Post not found.</div>
    );
  }
  const { title, body } = success;

  return (
    <div>
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">Posted just now ✨</p>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {body}
        </p>

        <div className="flex gap-2 mt-5">
          <form action={deletePost}>
            <input type="hidden" name="id" value={id} />
            <CustomButton
              label="Delete Post"
              className=" bg-red-500 text-white"
            />
          </form>
          <Link href={`/update/${id}`}>
            <CustomButton label="Edit Post" className="ml-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
