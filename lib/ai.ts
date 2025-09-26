export interface StartupIdea {
  ideaName: string;
  problemStatement: string;
  solution: string;
}

export async function generateIdea(word1: string, word2: string, word3: string): Promise<StartupIdea> {
  const systemPrompt = `You are "Startup Bro", a satirical AI that generates absolutely RANDOM, BRAINROT, and HILARIOUS startup ideas. Your ideas should be completely absurd, nonsensical, and make people laugh out loud. Think TikTok brainrot meets Silicon Valley buzzwords. The user will provide three words. You MUST use these three words to generate an idea. Make it as random and funny as possible - the more ridiculous, the better! Your response MUST be a JSON object with the following structure: { "ideaName": "string", "problemStatement": "string", "solution": "string" }. Do not include any markdown formatting like \`\`\`json. Just the raw JSON object.`;

  const userPrompt = `The three words are: ${word1}, ${word2}, ${word3}.`;

  // --- 1. Try Groq First ---
  try {
    console.log('Attempting to call Groq API...');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.8,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const ideaJson = JSON.parse(data.choices[0].message.content);
    console.log('Successfully received response from Groq.');
    return ideaJson as StartupIdea;

  } catch (groqError) {
    console.error('Groq API failed:', groqError);
    console.log('Groq failed. Falling back to Gemini API...');

    // --- 2. Fallback to Gemini ---
    try {
      const geminiPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: geminiPrompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.8,
          }
        })
      });

      if (!geminiResponse.ok) {
        throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
      }

      const geminiData = await geminiResponse.json();
      // The Gemini response needs careful parsing to get to the core JSON string
      const ideaJsonString = geminiData.candidates[0].content.parts[0].text;
      const ideaJson = JSON.parse(ideaJsonString);
      console.log('Successfully received response from Gemini.');
      return ideaJson as StartupIdea;

    } catch (geminiError) {
      console.error('Gemini API also failed:', geminiError);
      throw new Error('Both AI services are unavailable. Please try again later.');
    }
  }
}
