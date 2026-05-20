import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma }
from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await context.params;

    const analysis =
      await prisma.analysis.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (!analysis) {

      return NextResponse.json(
        {
          error:
            "Analysis not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch analysis",
        },
        {
          status: 500,
        }
      );
  }
}

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await context.params;

    await prisma.analysis.delete(
      {
        where: {
          id,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete analysis",
      },
      {
        status: 500,
      }
    );
  }
}