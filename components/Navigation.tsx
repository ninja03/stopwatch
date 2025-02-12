import { IS_BROWSER } from "$fresh/runtime.ts";
import NavLink from "./NavLink.tsx";

export default function Navigation() {
  return (
    <nav class="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 w-full">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center text-xl">
            <NavLink href="/">
              <span class="text-gray-100 font-bold text-2xl lg:text-3xl">ストップウオッチ</span>
            </NavLink>
          </div>
          <div class="flex space-x-6 lg:space-x-8">
            <NavLink href="/">ホーム</NavLink>
            <NavLink href="/about">特徴</NavLink>
            <NavLink href="/terms-of-service">利用規約</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
