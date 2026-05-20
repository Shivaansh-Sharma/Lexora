import { NextResponse }
from "next/server";

import { prisma }
from "@/lib/db/prisma";

import { auth }
from "@/lib/auth/auth";

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

    const analyses =
      await prisma.analysis.findMany(
        {
          where: {
            userId: user.id,
          },

          orderBy: {
            createdAt: "desc",
          },
        }
      );

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

    const formattedAnalyses =
      analyses.map(
        (item) => ({

          id: item.id,

          category:
            "analysis",

          type: item.type,

          createdAt:
            item.createdAt,

          preview:
            item.inputText.slice(
              0,
              180
            ),

          data: item,
        })
      );

    const formattedComparisons =
      comparisons.map(
        (item) => ({

          id: item.id,

          category:
            "comparison",

          type:
            "COMPARISON",

          createdAt:
            item.createdAt,

          preview:
            `${item.text1.slice(
              0,
              90
            )} ... ${item.text2.slice(
              0,
              90
            )}`,

          data: item,
        })
      );

    const reports = [
      ...formattedAnalyses,
      ...formattedComparisons,
    ].sort(
      (
        a,
        b
      ) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    );

    return NextResponse.json({
      success: true,
      reports,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch reports",
      },
      {
        status: 500,
      }
    );
  }
}