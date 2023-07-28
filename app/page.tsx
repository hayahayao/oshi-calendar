import Link from 'next/link'

export default function Home() {
  return (
    <div className="hero-content text-center">
      <div className="max-w-md font-mono">
        <h1 className="mb-5 text-5xl">推しカレンダー</h1>
        <p className="mb-5">Analyze my oshi calendar.</p>
        <Link href="/livers" className="mb-5 btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  )
}
