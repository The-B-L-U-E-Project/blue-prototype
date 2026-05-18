export default function Footer() {
  return (
    <footer className="py-5 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <nav className="flex flex-wrap gap-5">
          {['About BLUE', 'How it works', 'Verification', 'Policies', 'Contact'].map(link => (
            <a key={link} href="#" className="text-xs text-[#6B7280] hover:text-[#111827] hover:underline transition-colors">{link}</a>
          ))}
        </nav>
        <p className="text-xs text-[#6B7280]">
          Content licensed under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-[#374151] underline hover:underline">CC BY-SA 4.0</a>.
        </p>
      </div>
    </footer>
  )
}
