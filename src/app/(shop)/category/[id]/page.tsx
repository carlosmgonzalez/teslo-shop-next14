import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categories = ["men", "women", "kids"];

  if (!categories.includes(params.id)) notFound();

  return (
    <div>
      <h1>CategoryPage</h1>
    </div>
  );
}
