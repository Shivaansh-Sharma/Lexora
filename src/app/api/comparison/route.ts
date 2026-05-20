import { NextRequest, NextResponse }
from "next/server";

import { prisma }
from "@/lib/db/prisma";

import { auth }
from "@/lib/auth/auth";

export async function POST(
  request: NextRequest
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

    const body =
      await request.json();

    const comparison =
      await prisma.comparison.create(
        {
          data: {

            userId: user.id,

            text1:
              body.text1,

            text2:
              body.text2,

            result:
              body.result,
          },
        }
      );

    return NextResponse.json({
      success: true,
      comparison,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to save comparison",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {

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

    const comparisons =
      await prisma.comparison.findMany(
        {
          where: {
            userId: user.id,
          },

          orderBy: {
            createdAt: "desc",
          },
        }
      );

    return NextResponse.json({
      success: true,
      comparisons,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch comparisons",
      },
      {
        status: 500,
      }
    );
  }
}