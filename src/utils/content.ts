
export interface ContentResult<T> {
  attributes: T;
  body: string;
}

// Manual file lists to bypass glob issues - Production List
const DOMAIN_FILES = [
  'talkvid.md',
  'truehandler.md',
  'viromind.md',
  'vistagent.md',
  'earnid.md',
  'quintira.md',
  'steadybots.md',
  'sysrank.md',
  'fiin.md',
  'evaluator.md'
];

const BLOG_FILES = [
  'why-ai-domains-are-the-future.md'
];

// Simple Frontmatter Parser
const parseFrontmatter = <T>(text: string): ContentResult<T> => {
  if (!text) return { attributes: {} as T, body: '' };
  
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { attributes: {} as T, body: text };

  const frontmatter = match[1];
  const body = text.replace(/^---\n[\s\S]*?\n---/, '').trim();
  
  const attributes: any = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      value = value.replace(/^['"](.*)['"]$/, '$1');
      attributes[key] = value;
    }
  });

  return { attributes: attributes as T, body };
};

// Helper to fetch and parse a single MD file
const fetchAndParse = async <T>(url: string): Promise<ContentResult<T> | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const text = await response.text();
    return parseFrontmatter<T>(text);
  } catch (error) {
    console.warn(`Error loading content from ${url}`, error);
    return null;
  }
};

export const getAllDomains = async (): Promise<ContentResult<any>[]> => {
  const promises = DOMAIN_FILES.map(fileName => 
    fetchAndParse<any>(`/content/domains/${fileName}`)
  );
  
  const results = await Promise.all(promises);
  // Filter out nulls (failed fetches)
  return results.filter((item): item is ContentResult<any> => item !== null);
};

export const getAllBlogPosts = async (): Promise<(ContentResult<any> & { slug: string })[]> => {
  const promises = BLOG_FILES.map(async (fileName) => {
    const content = await fetchAndParse<any>(`/content/blog/${fileName}`);
    if (!content) return null;
    return { ...content, slug: fileName.replace('.md', '') };
  });

  const results = await Promise.all(promises);
  return results.filter((item): item is (ContentResult<any> & { slug: string }) => item !== null);
};

export const getPageContent = async (pageName: string): Promise<ContentResult<any> | null> => {
  return await fetchAndParse<any>(`/content/pages/${pageName}.md`);
};

export const fetchJsonContent = async <T>(path: string): Promise<T | null> => {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(`Settings not found at ${path}`);
    return null;
  }
};
