import { notFound } from 'next/navigation';
import { getEntry, registry } from '@/showcase/registry';
import StoryRenderer from '@/showcase/StoryRenderer';

/** Prerender every component page at build time. */
export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

/** Nothing outside the registry is a valid route. */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) return {};

  return { title: entry.name, description: entry.summary };
}

export default async function ComponentPage({ params }) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) notFound();

  return <StoryRenderer slug={slug} entry={entry} />;
}
