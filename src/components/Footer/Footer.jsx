export default function Footer() {
  return (
    <footer className="bottom-0 z-50 w-full py-10 bg-gray-200 mt-20">
      <div className="mx-auto w-full max-w-7xl px-8">
        <p className="text-sm text-gray-900 font-bold">About the shop</p>
        <div className="flex gap-5 mt-5">
          <a
            href="/about/FAQ"
            className="text-xs text-gray-800 underline hover:no-underline dark:text-primary-500"
          >
            FAQ
          </a>
          <a
            href="/about/privacy-policy/"
            className="text-xs text-gray-800 underline hover:no-underline dark:text-primary-500"
          >
            Privacy Policy
          </a>
          <a
            href="/about/term-of-service"
            className="text-xs text-gray-800 underline hover:no-underline dark:text-primary-500"
          >
            Terms of Service
          </a>
        </div>
        <p className="text-sm text-gray-900 mt-10">©American Apparel</p>
      </div>
    </footer>
  );
}
