import Hero from "@/layers/Hero";
import Products from "@/layers/FeatureProducts";
import Footer from "@/layers/Footer";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div>
      <Hero />
      <Products />
      <Footer />
    </div>
  );
}