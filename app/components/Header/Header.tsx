import Link from 'next/link'
import ThemeChanger from './ThemeChanger'

export default function Header() {
  return (
    <div className="navbar bg-primary text-primary-content font-mono">
      <div className="flex-none">
        <Link href="/" className="btn btn-square btn-ghost">
          <i className="nes-icon heart"></i>
        </Link>
      </div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Oshi Calendar | 推しカレンダー
        </Link>
      </div>

      <div className="flex-none justify-center">
        <ThemeChanger />
        <div className="divider"></div>
        <Link href="https://github.com/hayahayao/oshi-calendar">
          <button className="btn btn-square btn-ghost">
            <i className="nes-icon github"></i>
          </button>
        </Link>
      </div>
    </div>
  )
}
