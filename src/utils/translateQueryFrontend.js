import axios from "axios";

export async function translateQueryFrontend(userQuery) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-v3-base:free",
        messages: [
          {
            role: "system",
            content:
              "First, if the input query is in Bangla, translate it into English. Then fix any spelling mistakes or sound-alike mistakes. If already correct, return unchanged.",
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

    console.log("Translation response:", response.data);
    if (response?.data?.choices?.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      console.error("⚠️ No translation response received");
      return userQuery;
    }
  } catch (error) {
    console.error("Translation failed:", error.message);
    return userQuery;
  }
}
