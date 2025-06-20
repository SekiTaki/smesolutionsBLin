"use client";

import { useEffect, useState } from "react";

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

export default function Page({ params }: PageProps) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://smesolutions.local/wp-json/wp/v2/posts?slug=${params.slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data[0]));
  }, [params.slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
