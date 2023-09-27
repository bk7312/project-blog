import React from 'react';
import { notFound } from 'next/navigation'
import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';
import { BLOG_TITLE } from '@/constants';

import dynamic from 'next/dynamic';
// necessary to lazyload CodeSnippet? 
// this is technically a server component so probably not?
// but then, why do we lazyload DivisionGroupsDemo? 
// why not CodeSnippet as well since not all blog posts will require it?
const CodeSnippet = dynamic(() => import('@/components/CodeSnippet'))
// import CodeSnippet from '@/components/CodeSnippet';
const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'))
const CircularColorsDemo = dynamic(() => import('@/components/CircularColorsDemo'))
// possible to set dynamic import on component's index file to import normally

export async function generateMetadata({ params }) {
  const data = await loadBlogPost(params.postSlug)

  if (!data) notFound()

  const { frontmatter } = data

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {

  const data = await loadBlogPost(params.postSlug)

  if (!data) notFound()

  const { frontmatter, content } = data

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{
          pre: CodeSnippet,
          DivisionGroupsDemo,
          CircularColorsDemo,
          // note, move components obj to separate file along with import?
        }} />
      </div>
    </article>
  );
}

export default BlogPost;
