import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Navigation() {
  return (
    <nav class="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 w-full">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center text-xl">
            <a href="/" class="text-gray-100 font-bold text-2xl lg:text-3xl">
              ストップウォッチ
            </a>
          </div>
          <div class="flex space-x-6 lg:space-x-8">
            <a
              href="/"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200"
            >
              ホーム
            </a>
            <a
              href="/about"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200"
            >
              特徴
            </a>
            <a
              href="/terms-of-service"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200"
            >
              利用規約
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}