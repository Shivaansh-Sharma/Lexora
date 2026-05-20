import { NextResponse }
from "next/server";

import bcrypt from "bcryptjs";

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
      currentPassword,
      newPassword,
    } = body;

    if (
      !currentPassword ||
      !newPassword
    ) {

      return NextResponse.json(
        {
          error:
            "Missing fields",
        },
        {
          status: 400,
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

    const valid =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!valid) {

      return NextResponse.json(
        {
          error:
            "Incorrect current password",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update(
      {
        where: {
          email:
            session.user.email,
        },

        data: {
          password:
            hashedPassword,
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
          "Failed to update password",
      },
      {
        status: 500,
      }
    );
  }
}