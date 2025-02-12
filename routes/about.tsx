import Navigation from "../components/Navigation.tsx";
import FeatureCard from "../components/FeatureCard.tsx";
import Layout from "../components/Layout.tsx";
import FeatureList from "../components/FeatureList.tsx";

const features = [
  {
    title: "シンプルで使いやすい",
    description: "直感的なインターフェースで、誰でも簡単に使えるストップウォッチです. 必要な機能だけを搭載し、余計な機能は省いています."
  },
  {
    title: "高精度な計測",
    description: "ミリ秒単位での正確な時間計測が可能です. スポーツやタイムトライアルなど、精密な計測が必要な場面で活躍します."
  },
  {
    title: "モダンな技術スタック",
    description: "Fresh.jsとDenoを採用し、最新のWeb技術を活用しています. 高速な動作と信頼性の高いパフォーマンスを実現しています."
  },
  {
    title: "レスポンシブデザイン",
    description: "スマートフォンやタブレットなど、様々な画面サイズに対応. どのデバイスでも快適に使用できます."
  },
  {
    title: "オープンソース & コミュニティ",
    description: "このストップウォッチはオープンソースで提供され, 活発なコミュニティによってサポートされています. ユーザーは自ら機能を拡充することも可能です."
  },
  {
    title: "カスタマイズ機能",
    description: "個々のニーズに合わせた柔軟な設定が可能です. テーマやレイアウトのカスタマイズにより, よりパーソナライズされた体験を実現します."
  }
];

export default function About() {
  return (
    <Layout>
      <div class="py-16">
        <h1 class="text-5xl lg:text-6xl font-bold text-center mb-12 text-white">
          ストップウォッチの特徴
        </h1>
        <FeatureList features={features} />
      </div>
    </Layout>
  );
}
