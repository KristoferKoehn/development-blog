import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

type PostMeta = {
  title: string;
  image: string;
  excerpt?: string;
  date?: string;
  slug: string;
};

const postsDir = path.join(process.cwd(), 'content/blog');

export default function BlogPage() {
  const posts: PostMeta[] = fs.readdirSync(postsDir).map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDir, fileName);
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
    return { slug, ...(data as Omit<PostMeta, 'slug'>) };
  });

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-300 pb-6">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="rounded mb-4 object-cover"
                priority={true}
              />
            )}
            <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            {post.excerpt && <p className="mt-2 text-gray-700">{post.excerpt}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
