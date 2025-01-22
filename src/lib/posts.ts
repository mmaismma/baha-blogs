import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Define the type for the post metadata
interface PostMetadata {
  title: string
  date: string
  [key: string]: any // Allow additional metadata fields
}

export interface PostData {
  id: string
  title: string
  date: string
  [key: string]: any // Allow additional metadata fields
}

const postsDirectory: string = path.join(process.cwd(), '/_posts')

export function getSortedPostsData(): PostData[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id: string = fileName.replace(/\.md$/, '')

    const fullPath: string = path.join(postsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const metadata = matterResult.data as PostMetadata
    return {
      id,
      ...metadata,
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: any): Promise<any> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
