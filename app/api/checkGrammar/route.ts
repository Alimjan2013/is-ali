import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req: any = await request.json();

  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY1}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "As an English teaching bot, you need to help students check their grammar in sentences.\n\nThis is the Output Rule:\n\n  * Place any grammatical, spelling, or word choice errors within parentheses ().\n  * Replace the text in parentheses with the correct word or phrase within brackets 【】.\n  * Surround any unnecessary or redundant words or phrases with angle brackets <>.\n  * Try not to modify too many consecutive parts at once. Keep changes minimal.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Many students who graduate from university don't know how to manage money, and there is the reason that they have not recieved enough knowledge from economic education. ",
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "Many students who graduate from university don't know how to manage money, and there (is the reason that)【because】 they have not (recieved)【received】 enough <knowledge from> (economic)【financial】 education. ",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: req.text,
          },
        ],
      },
    ],
    response_format: {
      type: "text",
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const res = await fetch(url, { method: "POST", headers, body });
  const data = await res.json();
  console.log(data);

  return new NextResponse(JSON.stringify(data.choices[0].message));
}
