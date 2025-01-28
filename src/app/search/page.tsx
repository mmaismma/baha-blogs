import { getAllPosts } from '@/lib/posts'
import SearchResults from './SearchResults'

export default function SearchPage() {
  const allPosts = getAllPosts()

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Search Blogs</h1>
      <div className="mt-6">
        <SearchResults posts={allPosts} />
      </div>
    </div>
  )
}
