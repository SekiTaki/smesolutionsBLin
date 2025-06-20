// ❌ 不要加 'use client'

type PageProps = {
  params: {
    slug: string;
  };
};

type Post = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `http://smesolutions.local/wp-json/wp/v2/posts?slug=${params.slug}`,
    {
      next: { revalidate: 0 }, // 不要快取，否則文章更新不會立即反映
    }
  );

  const data = await res.json();
  const post = data[0];

  if (!post) {
    return <div className="p-6 text-red-600">找不到文章</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
