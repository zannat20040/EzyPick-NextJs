import axios from "axios";

export async function translateQueryFrontend(userQuery) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        max_tokens: 20,
        messages: [
          {
            role: "system",
            content: `
          You are a language correction and translation assistant. Your task is to fix or translate a single word or short phrase, following these strict rules:

1. If the input is written in Bangla script (e.g., "পানি"), translate it accurately into proper English (e.g., "water").
2. If the input is written in Banglish — that is, Bengali words typed using English letters (e.g., "bhalo", "ghor", "hater ghori") — detect its Bengali meaning and translate that meaning into correct English.
3. If the input is a misspelled English word or a miswritten form that sounds like another word (e.g., "omen" intended as "women", or "comit" for "commit"), return the correct, most likely word.
4. If the input is already a correct English word and makes sense, return it as-is.
5. Be sensitive to phonetic or sound-alike confusion caused by typing errors or language mix.

⚠️ VERY IMPORTANT: Your response must contain only the final corrected or translated word or phrase — no explanations, definitions, examples, or extra text.

`.trim(),
          },
          {
            role: "user",
            content: userQuery,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourwebsite.com",
          "X-Title": "Your Website Name",
        },
      }
    );

    const output = response?.data?.choices?.[0]?.message?.content?.trim();
    console.log("Full OpenRouter response:", response.data);
    return output || userQuery;
  } catch (error) {
    console.error("Translation failed:", error);
    return userQuery;
  }
}
