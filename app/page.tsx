"use client"; // ✅ 必須放最上面，不能放在 import 後面

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Post = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://smesolutions.local/wp-json/wp/v2/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("錯誤：無法撈文章", err);
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">文章列表</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold">
            <Link
              href={`/post/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title.rendered}
            </Link>
          </h2>
        </div>
      ))}
    </main>
  );
}
