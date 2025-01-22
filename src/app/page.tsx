import { getSortedPostsData } from '@/lib/posts'
import BlogList from '@/app/_components/BlogList'
import { Suspense } from 'react'
import Carousel from '@/app/_components/carousel'

export default function Page() {
  const posts = getSortedPostsData()

  return (
    <>
      <Carousel posts={posts} />
      <div className="p-3 max-w-7xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold">All blogs</h1>
        <Suspense>
          <BlogList initialPosts={posts} />
        </Suspense>
      </div>
    </>
  )
}
