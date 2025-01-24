'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PostInformation } from '@/lib/posts'
import { useSearchParams } from 'next/navigation'

export default function BlogList({
  initialPosts,
}: {
  initialPosts: PostInformation[]
}) {
  const [query, setQuery] = useState(useSearchParams().get('query') ?? '')

  const filteredPosts = initialPosts.filter(
    (post) =>
      post.title?.toLowerCase().includes(query.toLowerCase()) ||
      post.author?.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              href={`/${post.id}`}
              key={post.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:text-brand"
            >
              <Image
                src={post.image ?? ''}
                style={{
                  background: `linear-gradient(10deg, ${post?.accentColors[0]}, ${post?.accentColors[1]})`,
                }}
                alt={post.title ?? 'Image'}
                width={2000}
                height={2000}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Author:</strong> {post.author}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong> {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No posts found</p>
          {query && (
            <p className="mt-2 text-gray-500">
              Try adjusting your search or browse all our posts.
            </p>
          )}
          <button
            onClick={() => setQuery('')}
            className="mt-4 inline-block px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            View All Posts
          </button>
        </div>
      )}
    </>
  )
}
