import { notFound } from 'next/navigation'
import { getPostData, getSortedPostsData } from '@/lib/posts'

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return await Promise.all(
    getSortedPostsData().map(async (x) => await getPostData(x.id)),
  )
}

export default async function Post(props: Params) {
  const params = await props.params
  const postData = await getPostData(params.id)

  if (!postData) {
    return notFound()
  }

  return (
    <article className="prose mx-auto pt-6">
      <p className="text-sm text-gray-500 px-3">
        last updated: {postData.date}, written by: {postData.author}
      </p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}
