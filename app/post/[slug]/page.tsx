import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  const res = await fetch(
    `http://smesolutions.local/wp-json/wp/v2/posts?slug=${slug}`
  );
  const data = await res.json();
  const post = data[0];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
