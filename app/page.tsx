import { Pencil } from "lucide-react";
import CustomButton from "@/components/custom-button";
import { getPosts } from "@/server/actions";
import Link from "next/link";

async function HomePage() {
  const { error, success } = await getPosts();

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="relative max-w-5xl mx-auto py-12 px-6">
      <Link href={"/create"}>
        <CustomButton
          className="fixed bottom-6 right-6 w-15 h-15 rounded-full shadow-xl hover:scale-110"
          icons={<Pencil className="size-[22px]" />}
        />
      </Link>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">📝 Blog List</h1>
      </div>

      {success && success.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {success.map((blog: any) => (
            <Link href={`/blog/${blog.id}`} key={blog.id} className="">
              <div
                key={blog.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <img
                  src="https://www.shutterstock.com/image-vector/vector-hand-painted-watercolor-blog-600nw-339532466.jpg"
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {blog.body.length > 100 ? (
                    <>
                      {blog.body.substring(0, 100)}
                      <span className="text-primary ml-1 hover:underline">
                        Read more
                      </span>
                    </>
                  ) : (
                    blog.body
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No posts found. Start by adding one!
        </div>
      )}
    </div>
  );
}

export default HomePage;
