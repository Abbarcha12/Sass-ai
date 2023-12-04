import { auth } from "@clerk/nextjs";
import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { incrementApiLimit, checkApiLimit } from "../../../lib/api-limit";
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
    const { prompt,amount=1,resolution="512x512" } = body;
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    

    if (!prompt) {
      return new NextResponse("prompt  is required", {
        status: 400,
      });
    }
    if (!amount) {
      return new NextResponse("prompt  is required", {
        status: 400,
      });
    }
    if (!resolution) {
      return new NextResponse("prompt  is required", {
        status: 400,
      });
    }
    const freeTrial = await checkApiLimit();
    
    if (!freeTrial ) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n:parseInt(amount,10),
      size:resolution

    });
    await incrementApiLimit();
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}