'use client'

import { PostData } from '@/lib/posts'
import useEmblaCarousel from 'embla-carousel-react'

export default function Carousel({ posts }: { posts: PostData[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  return (
    <section className="embla" ref={emblaRef}>
      <div className="embla__container">
        {posts.map((x) => (
          <div
            key={x.id}
            className="embla__slide"
            style={{
              background: `linear-gradient(70deg, #fdfbfbbb 20%, #fdfbfb99 50%, #ebedee00 80%), right / cover no-repeat url(${x.image})`,
              userSelect: 'none',
              padding: '20px 20% 20px 20px',
              textWrap: 'balance',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              color: '#333',
            }}
          >
            <span>{[x.author, x.date].join(' • ')}</span>
            <span style={{ fontSize: 'xxx-large', fontWeight: 'bold' }}>
              {x.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
