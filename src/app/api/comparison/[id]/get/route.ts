import { NextResponse }
from "next/server";

import { prisma }
from "@/lib/db/prisma";

import { auth }
from "@/lib/auth/auth";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const session =
      await auth();

    if (!session?.user?.email) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user =
      await prisma.user.findUnique(
        {
          where: {
            email:
              session.user.email,
          },
        }
      );

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const { id } =
      await params;

    const comparison =
      await prisma.comparison.findFirst(
        {
          where: {
            id,
            userId: user.id,
          },
        }
      );

    if (!comparison) {

      return NextResponse.json(
        {
          error:
            "Comparison not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      comparison,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch comparison",
      },
      {
        status: 500,
      }
    );
  }
}