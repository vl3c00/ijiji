import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET() { // Removed 'request' parameter
    const user = await currentUser();
    if (!user) {
        redirect("sign-in");
    }

    const periods = await getHistoryPeriods(user.id);
    return Response.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited<ReturnType<typeof getHistoryPeriods>>;

async function getHistoryPeriods(userId: string) {
    const result = await prisma.monthHistory.findMany({
        where: {
            userId,
        },
        select: {
            year: true,
        },
        distinct: ["year"],
        orderBy: [
            {
                year: "asc",
            },
        ],
    });

    // Explicitly type the 'el' parameter
    const years = result.map((el: { year: number }) => el.year); // Specify the type of 'el'

    if (years.length == 0) {
        // Return the current year if no years found
        return [new Date().getFullYear()];
    }

    return years;
}
