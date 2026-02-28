import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Calendar, Clock } from 'lucide-react';

const posts = [
  {
    slug: 'why-i-built-an-8-agent-ai-team-instead-of-hiring',
    title: 'Why I built an 8-agent AI team instead of hiring',
    description: 'I run two businesses with zero employees. Here\'s how an AI team of 8 specialized agents handles everything from development to customer support.',
    date: '2025-02-25',
    readTime: '6 min read',
  },
];

function BlogCard({ post }: { post: typeof posts[0] }) {
  return (
    <article className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-center text-sm text-zinc-500 space-x-4 mb-4">
        <span className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>{post.date}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{post.readTime}</span>
        </span>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-3">
        <Link 
          href={`/blog/${post.slug}`}
          className="hover:text-zinc-300 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      <p className="text-zinc-400 leading-relaxed mb-4">
        {post.description}
      </p>
      
      <Link 
        href={`/blog/${post.slug}`}
        className="text-white hover:text-zinc-300 transition-colors font-medium"
      >
        Read more →
      </Link>
    </article>
  );
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Thoughts on AI automation, building scalable systems, and the future of work
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center text-zinc-500">
            <p>More posts coming soon...</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}