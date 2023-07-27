import Link from 'next/link'
import ThemeChanger from './ThemeChanger'

export default function Header() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      {/* TODO: link hover default style? */}
      <Link href="/" className="flex-1">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <i className="nes-icon heart"></i>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl font-mono">
            Oshi Calendar | 推しカレンダー
          </a>
        </div>
      </Link>
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
