import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDir);

  return filenames.map((name) => ({
    slug: name.replace(/\.md$/, ''),
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    throw new Error('No slug provided');
  }

  const postsDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <main>
        <h1>Post not found</h1>
        <p>No blog post found for slug: {slug}</p>
      </main>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  return (
    <article className="prose mx-auto py-8 px-4">
      <h1>{data.title}</h1>
      {data.date && <p className="text-sm text-gray-500">{data.date}</p>}
      <div>{content}</div>
    </article>
  );
}
