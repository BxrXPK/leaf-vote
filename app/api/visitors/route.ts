import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";

// Function to handle POST requests
export async function POST() {
    try {
        const { db } = await connectDB();
        const visitorsCollection = db.collection("stats");
        const result = await visitorsCollection.findOneAndUpdate(
            {},
            { $inc: { totalVisitors: 1 } },
            { returnDocument: "after" }
        );

        if (!result) {
            console.log("Failed to increment visitor count. Please restart the server.");
            return new NextResponse(
                JSON.stringify({ message: "Failed to increment visitor count." }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({ result: result }),
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
