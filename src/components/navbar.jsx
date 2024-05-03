import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow dark:bg-gray-950  ">
      <div className="container px-12 md:px-6">
        <div className="flex h-14 items-center">
          <Link
            className="mr-auto flex items-center gap-2 text-lg font-semibold"
            href="#"
          >
            <span>Finite Automata</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-10">
            <Link
              className="font-medium text-base border-b-2 border-transparent transition-colors hover:text-purple-900 
              hover:border-purple-700 dark:hover:text-gray-50 dark:hover:border-gray-800"
              href="/"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
