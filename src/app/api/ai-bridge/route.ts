import { getWixClient } from "@/lib/wix-client";
import { StreamingTextResponse } from 'ai';

export async function POST(req: Request) {
  try {
    const wixClient = getWixClient();
    const { query, context } = await req.json();

    // Get product context
    const products = await wixClient.products.queryProducts().find();
    const productContext = products.items.map(p => ({
      name: p.name,
      price: p.price,
      description: p.description,
      inStock: p.stock?.inStock
    }));

    // Forward to AI service with context
    const response = await fetch(process.env.AI_SERVICE_URL + '/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_SERVICE_API_KEY}`
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: query
        }],
        context: {
          products: productContext,
          ...context
        }
      })
    });

    // Return streaming response
    return new StreamingTextResponse(response.body!);
  } catch (error) {
    console.error('AI Bridge Error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}