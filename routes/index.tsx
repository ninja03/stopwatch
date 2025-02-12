import Stopwatch from "../islands/Stopwatch.tsx";
import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout>
      <div class="py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-gray-100">ストップウォッチ</h1>
        <Stopwatch />
      </div>
    </Layout>
  );
}
