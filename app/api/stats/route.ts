import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";


export async function GET(req: Request) {
    try {
        const { db } = await connectDB();
        const statsCollection = db.collection("stats");
        const stats = await statsCollection.findOne();

        if (!stats) {
            const createStats = await statsCollection.insertOne({
                activeVotes: 0,
                totalVisitors: 0,
                totalCreated: 0,
            });

            if (!createStats) {
                console.log("Failed to create stats. Please restart the server.");
                return new NextResponse(
                    JSON.stringify({ message: "Failed to create stats." }),
                    { status: 500 }
                );
            } else {
                console.log("Stats created successfully.");
                return new NextResponse(
                    JSON.stringify({ message: "Stats created successfully." }),
                    { status: 201 }
                );
            }
        }


        return new NextResponse(
            JSON.stringify(stats),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(
            JSON.stringify({ message: error || "An unknown error occurred." }),
            { status: 500 }
        );
    }
}