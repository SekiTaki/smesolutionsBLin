"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://smesolutions.local/wp-json/wp/v2/posts?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) {
    return <div className="p-6 text-gray-600">載入中或找不到文章</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
