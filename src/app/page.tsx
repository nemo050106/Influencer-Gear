import Hero from "@/layers/Hero";
import Products from "@/layers/Products";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div>
      <Hero />
      <Products searchParams={searchParams} />
    </div>
  );
}