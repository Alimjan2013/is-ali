import { Result } from "postcss";

export async function POST(request: Request) {
    const req:any = await request.json()

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "As an English teaching bot, you need to help students check their grammar in sentences.",
        },
        {
          role: "system",
          content: `This is the Output Rule:
  
      * Identify any grammatical, spelling or word choice errors within parentheses ().
      * Replace the text in parentheses with the correct word or phrase within brackets 【】.
      * Identify any unnecessary or redundant words or phrases within <>.
      * Try not to modify too many consecutive parts at once. Keep changes minimal.`,
        },
        {
          role: "user",
          content: `Many students who graduate from university don't know how to manage money, and there is the reason that they have not recieved enough knowledge from economic education. `,
        },
        {
          role: "assistant",
          content:
            "Many students who graduate from university don't know how to manage money, and there (is the reason that)【because】 they have not (recieved)【received】 enough <knowledge from> (economic)【financial】 education. ",
        },
        {
          role: "user",
          content: req.text,
        },
      ],
      model: "llama3-70b-8192",
    });
    const res = await fetch(url, { method: "POST", headers, body });
    const data = await res.json();
    console.log(data);

    return new Response(JSON.stringify(data.choices[0].message));


}
