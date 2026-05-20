import { NextResponse }
from "next/server";

import { prisma }
from "@/lib/db/prisma";

import { auth }
from "@/lib/auth/auth";

export async function DELETE(
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

    await prisma.comparison.delete(
      {
        where: {
          id,
          userId: user.id,
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
          "Failed to delete comparison",
      },
      {
        status: 500,
      }
    );
  }
}