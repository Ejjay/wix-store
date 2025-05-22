export class AIService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.AI_SERVICE_URL!;
    this.apiKey = process.env.AI_SERVICE_API_KEY!;
  }

  async getAIResponse(query: string, context?: any) {
    try {
      const response = await fetch(`${this.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: query
          }],
          context: context
        })
      });
      return response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }
}