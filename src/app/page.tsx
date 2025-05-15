import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              MyLogo
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">Chi siamo</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">Contatti</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Accedi Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
