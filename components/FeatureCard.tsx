interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div class="bg-gray-800 rounded-xl px-12 py-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01]">
      <h2 class="text-3xl lg:text-4xl font-bold mb-6 text-white text-center">
        {title}
      </h2>
      <p class="text-gray-200 text-xl leading-loose">
        {description}
      </p>
    </div>
  );
}