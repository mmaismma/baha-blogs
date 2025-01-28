'use client'

import './style.css'
import { PostMetadata } from '@/lib/posts'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import Link from 'next/link'

export default function PostCarousel({
  posts,
  style,
}: {
  posts: PostMetadata[]
  style?: Record<string, string>
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay(),
    ClassNames(),
  ])

  return (
    <section className="embla" style={style} ref={emblaRef}>
      <div className="embla__container">
        {posts.map((post) => (
          <Link
            href={`./${post.id}`}
            key={post.id}
            className="embla__slide"
            style={{
              background: `
                linear-gradient(70deg, #fdfbfbbb 20%, #fdfbfb99 50%, #ebedee00 80%), 
                ${
                  post.image
                    ? `url(${post.image})`
                    : `linear-gradient(10deg, ${post.accentColors[0]}, ${post.accentColors[1]})`
                }
              `,
              backgroundPosition: post.image ? 'right' : 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="metadata">
              <span>{[post.author, post.date].join(' • ')}</span>
              <span style={{ fontSize: '3em', fontWeight: 'bold' }}>
                {post.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
