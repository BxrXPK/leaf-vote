import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.sessionTitle || !body.titles || !body.expiry) {
            return new NextResponse(
                JSON.stringify({
                    message:
                        "Please enter a session title, at least one title, and an expiry date.",
                }),
                { status: 400 }
            );
        }

        const { db } = await connectDB();

        if (!db) {
            console.log("Failed to connect to database. Please restart the server.");
        } else {
            console.log("Connected to database. Creating SID ...");
        }

        const votesCollection = db.collection("sid");
        const titlesWithIds = body.titles.map((title: string) => title);
        const createdTime = new Date();
        const sessionExpiry = new Date(createdTime.getTime() + body.expiry * 24 * 60 * 60 * 1000);

        const result = await votesCollection.insertOne({
            sessionTitle: body.sessionTitle,
            expiry: sessionExpiry.toISOString(),
            votes: titlesWithIds.map((title: string) => ({
                title: title,
                id: titlesWithIds.indexOf(title),
                votings: 0,
            })),
        });

        if (!result) {
            console.log("Failed to create SID. Please restart the server.");
            return new NextResponse(
                JSON.stringify({ message: "Failed to create SID." }),
                { status: 500 }
            );
        } else {
            console.log(`SID created successfully. Session ID: ${result.insertedId}`);
            console.log(result);
            const statsCollection = db.collection("stats");
            await statsCollection.findOneAndUpdate(
                {},
                { $inc: { totalCreated: 1, activeVotes: 1 } },
                { returnDocument: "after" }
            );

            return new NextResponse(
                JSON.stringify({ sid: result.insertedId.toString() }),
                { status: 201 },
            );
        }

    } catch (error) {
        console.log("Error creating SID:", error);
        return new NextResponse(
            JSON.stringify({ message: "Failed to create SID. Please restart the server." }),
            { status: 500 }
        );
    }
}