import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type PostMeta = {
  title: string;
  image: string;
  excerpt?: string;
};

type Post = PostMeta & {
  slug: string;
};

const postsDir = path.join(process.cwd(), 'content/blog');

export default function BlogPage() {
  const posts: Post[] = fs.readdirSync(postsDir).map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDir, fileName);
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
    const postData = data as PostMeta;

    // Return an object with slug and the rest of the metadata
    return { slug, ...postData };
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug} className="border-b border-white/20 pb-4">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-xl font-semibold hover:underline">{post.title}</h3>
            </Link>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
