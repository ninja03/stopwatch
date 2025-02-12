import Stopwatch from "../islands/Stopwatch.tsx";
import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout>
      <div class="py-8">
        <Stopwatch />
      </div>
    </Layout>
  );
}
