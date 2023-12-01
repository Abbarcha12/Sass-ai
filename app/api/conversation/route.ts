import { auth } from "@clerk/nextjs";
import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  organization:"org-pIEKPMVJc4ilMtMC6u1VOb9T",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key is not configured", {
        status: 500,
      });
    }
    const { userId } =  auth();

    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    

    if (!messages) {
      return new NextResponse("Message is required", {
        status: 400,
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}