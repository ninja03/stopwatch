import FeatureCard from "./FeatureCard.tsx";

interface Feature {
  title: string;
  description: string;
}

interface FeatureListProps {
  features: Feature[];
}

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <div class="flex flex-col gap-8 max-w-3xl mx-auto">
      {features.map((feature, index) => (
        <FeatureCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  );
}