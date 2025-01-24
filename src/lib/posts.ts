import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface PostInformation {
  id: string
  title?: string
  date?: string
  [key: string]: any // Allow additional metadata fields
}

export interface PostData {
  id: string
  title?: string
  date?: string
  contentHtml: string
  [key: string]: any // Allow additional metadata fields
}

const postsDirectory: string = path.join(process.cwd(), '/_posts')

export function getSortedPostsData(): PostData[] {

function getPostMetadata(id: string): {
  metadata: Record<string, string>
  content: string
} {
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, `${id}.md`),
    'utf8',
  )
  const matterResult = matter(fileContents)
  const metadata = matterResult.data
  return {
    metadata,
    content: matterResult.content,
  }
}

export function getAllPosts(): PostInformation[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory)
  const allPostsData: PostInformation[] = fileNames.map((fileName) => {
    const id: string = fileName.replace(/\.md$/, '')
    const { metadata } = getPostMetadata(id)

    return {
      id,
      ...metadata,
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return (a.date ?? 0) < (b.date ?? 0) ? 1 : -1
  })
}

export async function getPostData(id: any): Promise<any> {
  const { metadata, content } = getPostMetadata(id)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    id,
    ...metadata,
    contentHtml,
  }
}
