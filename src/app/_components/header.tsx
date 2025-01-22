'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

const Header = () => {
  return (
    <nav
      className={`flex items-center justify-between sticky top-0 z-50 p-4 lg:px-8 
        bg-[#F7F6F5]/80 backdrop-blur-lg backdrop-saturate-[180%] mb-4
        [amask-image:linear-gradient(to_top,#fff0,#fffa_0.3rem,#ffff_1rem)]`}
    >
      <h2>
        <Link
          href="/"
          className="flex flex-row items-end gap-4 text-2xl font-smallcaps font-semibold tracking-wider text-[#45433d]"
        >
          <Image
            src="./assets/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="filter dark:drop-shadow-lg dark:shadow-inherit"
            placeholder="empty"
          />
          | Blog
        </Link>
      </h2>

      <form action="/" method="GET" className="flex">
        <input
          type="text"
          name="query"
          placeholder="Search blogs..."
          defaultValue={useSearchParams().get('query') ?? ''}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 text-white rounded-r-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Search
        </button>
      </form>
    </nav>
  )
}

export default Header
