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

export default async function Page({ params }: PageProps) {
  const res = await fetch(
    `http://smesolutions.local/wp-json/wp/v2/posts?slug=${params.slug}`,
    {
      // 👇 避免 cache，確保內容即時更新
      next: { revalidate: 0 },
    }
  );

  const data = await res.json();
  const post: Post = data[0];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
