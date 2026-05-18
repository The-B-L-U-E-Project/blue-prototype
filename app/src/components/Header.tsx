import { Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-50">
      <div className="w-full px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="font-serif text-2xl font-medium text-[#111827] no-underline shrink-0">
          BLUE
        </a>

        {/* Right side grouping: Nav + Search + Login */}
        <div className="flex items-center gap-6">

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#4B5563]">
            {['Subjects', 'Guides', 'Walkthroughs', 'About', 'Contribute'].map(link => (
              <a key={link} href="#" className="hover:text-[#111827] transition-colors">{link}</a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center border border-[#E5E7EB] rounded bg-white px-3 gap-2 h-9 w-72 ml-2">
            <input
              placeholder="Search BLUE..."
              className="outline-none bg-transparent text-[13px] text-[#111827] placeholder-[#9CA3AF] w-full"
            />
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
          </div>

          {/* Log in */}
          <a href="#" className="text-[13px] font-medium text-[#4B5563] hover:text-[#111827] mx-2">
            Log in
          </a>

        </div>
      </div>
    </header>
  )
}
