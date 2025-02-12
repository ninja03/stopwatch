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
          <p>この利用規約(以下「本規約」といいます)は、[アプリケーション名](以下「本サービス」といいます)の利用に関する全ての事項を規定するものです。</p>
          <p><strong>1. 定義</strong></p>
          <p>本規約において、以下の用語はそれぞれ下記の意味を有します。</p>
          <ul>
            <li>「ユーザー」:本サービスを利用する個人または法人をいいます。</li>
            <li>「本サービス」:[アプリケーション名]を指します。</li>
          </ul>
          <p><strong>2. 利用許諾</strong></p>
          <p>当社は、ユーザーに対し、本サービスを本規約に従って利用する非独占的、譲渡不可のライセンスを許諾します。</p>
          <p><strong>3. 禁止事項</strong></p>
          <p>ユーザーは、以下の行為を禁止します。</p>
          <ul>
            <li>本サービスの不正利用</li>
            <li>本サービスの改ざん</li>
            <li>他者の権利を侵害する行為</li>
          </ul>
          <p><strong>4. 免責事項</strong></p>
          <p>当社は、本サービスの利用によって生じた一切の損害について、責任を負いません。</p>
          <p><strong>5. 規約の変更</strong></p>
          <p>当社は、本規約を随時変更できるものとします。</p>
          <p><strong>6. その他</strong></p>
          <p>本規約に関する紛争は、[管轄裁判所]を第一審の専属的合意管轄裁判所とします。</p>
        </div>
      </div>
    </Layout>
  );
}