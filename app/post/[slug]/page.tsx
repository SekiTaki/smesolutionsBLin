import axios from "axios";
import { notFound } from "next/navigation";

type Post = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await axios.get(
    `http://smesolutions.local/wp-json/wp/v2/posts?slug=${params.slug}`
  );
  const posts: Post[] = res.data;

  if (posts.length === 0) {
    notFound();
  }

  const post = posts[0];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{post.title.rendered}</h1>
      <div
        className="mt-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  );
}
