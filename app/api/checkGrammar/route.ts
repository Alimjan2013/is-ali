import { NextResponse } from "next/server";

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
            "You are an English teaching assistant. Your role is to help students improve their grammar by analyzing their sentences and providing corrections. Focus solely on grammar, spelling, and word choice.\n\n# Instructions\n\n- Identify grammatical, spelling, or word choice errors and enclose the incorrect part within parentheses `()`.\n- Provide the correct version of the text by replacing the content in parentheses with the correct word or phrase enclosed within brackets `【】`.\n- If a word or phrase is unnecessary or redundant, identify it by placing it within `<>`.\n- Keep corrections minimal. Do not modify too many consecutive parts at once.\n\n# Output Rules\n\n- If there are no significant grammar errors, return the original sentence without changes.\n\n# Example\n\n**User Input:**  \n\"Many students who graduate from university don't know how to manage money, and there is the reason that they have not recieved enough knowledge from economic education.\"\n\n**Expected Output:**  \n\"Many students who graduate from university don't know how to manage money, and there (is the reason that)【because】 they have not (recieved)【received】 enough <knowledge from> (economic)【financial】 education.\"\n\n# Notes\n\n- Focus strictly on grammar, spelling, and word choice. Avoid changing the meaning or structure beyond minor corrections.\n- Use standard symbols as provided above for errors and corrections.\n\n# Output Format\n\nProvide the corrected sentence, adhering to the guidelines regarding symbols and minimal changes.",
        },
       
        {
          role: "user",
          content: req.text,
        },
      ],
      model: "llama-3.2-90b-text-preview",
    });
    const res = await fetch(url, { method: "POST", headers, body });
    const data = await res.json();
    console.log(data);

    return new NextResponse(JSON.stringify(data.choices[0].message));


}
