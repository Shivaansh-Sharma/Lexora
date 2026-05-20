import { NextResponse }
from "next/server";

import { auth }
from "@/lib/auth/auth";

import { prisma }
from "@/lib/db/prisma";

export async function PATCH(
  req: Request
) {

  try {

    const session =
      await auth();

    if (
      !session?.user?.email
    ) {

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

    const body =
      await req.json();

    const {
      name,
    } = body;

    if (
      !name ||
      name.length < 2
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid name",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.user.update(
      {
        where: {
          email:
            session.user.email,
        },

        data: {
          name,
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
      }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}