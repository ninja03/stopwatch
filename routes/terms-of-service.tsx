import { Handlers } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
};

export default function TermsOfService() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-xl">
        <h1 class="text-2xl font-bold mb-4">利用規約</h1>
        <div class="prose">
  <p class="mb-8">この利用規約(以下「本規約」といいます)は、ストップウオッチ(以下「本サービス」といいます)の利用に関する全ての事項を規定するものです。</p>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-4">1. 定義</h2>
    <p class="mb-4">本規約において、以下の用語はそれぞれ下記の意味を有します。</p>
    <ul class="list-disc list-inside">
      <li class="mb-2">「ユーザー」: 本サービスを利用する個人または法人をいいます。</li>
      <li class="mb-2">「本サービス」: ストップウオッチを指します。</li>
    </ul>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-4">2. 利用許諾</h2>
    <p>当社は、ユーザーに対し、本サービスを本規約に従って利用する非独占的、譲渡不可のライセンスを許諾します。</p>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-4">3. 禁止事項</h2>
    <p class="mb-4">ユーザーは、以下の行為を禁止します。</p>
    <ul class="list-disc list-inside">
      <li class="mb-2">本サービスの不正利用</li>
      <li class="mb-2">本サービスの改ざん</li>
      <li class="mb-2">他者の権利を侵害する行為</li>
    </ul>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-4">4. 免責事項</h2>
    <p>当社は、本サービスの利用によって生じた一切の損害について、責任を負いません。</p>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-4">5. 規約の変更</h2>
    <p>当社は、本規約を随時変更できるものとします。</p>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-4">6. その他</h2>
    <p>本規約に関する紛争は、Denoくん裁判所を第一審の専属的合意管轄裁判所とします。</p>
  </section>
</div>
      </div>
    </Layout>
  );
}
