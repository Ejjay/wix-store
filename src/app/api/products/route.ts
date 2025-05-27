import { getWixClient } from "@/lib/wix-client.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wixClient = getWixClient();
    const { items } = await wixClient.products
      .queryProducts()
      .limit(100) // Adjust based on your needs
      .find();

    // Only return necessary product data to reduce payload size
    const simplifiedProducts = items.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      slug: product.slug
    }));

    return NextResponse.json({ items: simplifiedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}