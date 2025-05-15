
import Link from 'next/link';
import './globals.css';
export default function Home() {
  return (
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a href="/" class="text-xl font-bold text-gray-800">MyLogo</a>
          </div>

          <!-- Links -->
          <div class="hidden md:flex space-x-4">
            <a href="/" class="text-gray-600 hover:text-blue-500">Home</a>
            <a href="#" class="text-gray-600 hover:text-blue-500">Chi siamo</a>
            <a href="#" class="text-gray-600 hover:text-blue-500">Contatti</a>
          </div>

            <!-- CTA Button -->
          <div class="hidden md:block">
              <a href="/admin" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Accedi Admin</a>
            </div>
          </div>
        </div>
      </nav>
  )
}
