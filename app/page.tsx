import Link from 'next/link'

export default function Home() {
  return (
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <Link href="/livers" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  )
}
