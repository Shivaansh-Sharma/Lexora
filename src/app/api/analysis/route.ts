import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { type, inputText, result, language } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        type,
        inputText,
        result,
        language,
      },
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}