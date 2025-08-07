// Individual Blog Page: app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function generateStaticParams() {
  const files = fs.readdirSync('content/blog');
  return files.map((file) => ({ slug: file.replace(/\.md$/, '') }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const html = marked(content);

  return (
    <article className="prose prose-invert">
      <h1>{data.title}</h1>
      <img src={data.image} alt="" className="my-4 rounded" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
