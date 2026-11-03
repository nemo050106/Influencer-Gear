import Link from 'next/link'
import { FaInstagram, FaYoutube, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa'

const shopLinks = [
  { href: '/', label: 'All products' },
  { href: '/my-orders', label: 'My orders' },
]

const accountLinks = [
  { href: '/login', label: 'Sign in' },
  { href: '/register', label: 'Create account' },
  { href: '/dashboard', label: 'Dashboard' }, // change to your user dashboard route
]

const categories = ['Camera & Photo', 'Audio', 'Lighting', 'Computers & Streaming']

const socials = [
  { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
  { href: 'https://youtube.com', label: 'YouTube', icon: FaYoutube },
  { href: 'https://twitter.com', label: 'Twitter', icon: FaTwitter },
  { href: 'https://github.com', label: 'GitHub', icon: FaGithub },
]

const linkClass = 'text-sm text-slate-500 transition-colors hover:text-purple-600'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-purple-100 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-sm font-bold tracking-wider text-white shadow-md shadow-indigo-200">
                IG
              </span>
              <span className="text-lg font-bold text-indigo-950">
                Influencer <span className="text-indigo-600">Gear</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              High-performance gear for modern creators: cameras, audio, lighting and more.
            </p>

            <ul className="flex items-center gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-purple-50 hover:text-purple-600 hover:ring-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    <Icon className="text-sm" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <nav aria-label="Shop">
            <h3 className="text-sm font-semibold text-indigo-950">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-semibold text-indigo-950">Popular categories</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c} className="text-sm text-slate-500">{c}</li>
              ))}
            </ul>
          </nav>

          {/* Account */}
          <nav aria-label="Account">
            <h3 className="text-sm font-semibold text-indigo-950">Account</h3>
            <ul className="mt-4 space-y-2.5">
              {accountLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-950">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="mailto:support@influencergear.com" className={`${linkClass} inline-flex items-center gap-2`}>
                  <FaEnvelope className="text-xs text-purple-400" />
                  support@influencergear.com
                </a>
              </li>
              <li className="text-sm text-slate-500">Sat – Thu, 10am – 8pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-purple-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} Influencer Gear. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">Built with Next.js, Express and MongoDB</p>
        </div>
      </div>
    </footer>
  )
}