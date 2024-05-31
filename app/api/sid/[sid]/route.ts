import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { Sid } from "@/models/sid";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const sid = url.pathname.split("/").pop();

        if (!sid || !ObjectId.isValid(sid)) {
            console.log(`Invalid Session ID: ${sid}`);
            return new NextResponse(
                JSON.stringify({ message: "Invalid Session ID" }),
                { status: 400 }
            );
        }

        const { db } = await connectDB();
        const voteSession = await db.collection("sid").findOne({ _id: new ObjectId(sid) });

        if (!voteSession) {
            console.log("Session not found for ID:", sid);
            return new NextResponse(
                JSON.stringify({ message: "Session not found" }),
                { status: 404 }
            );
        }

        if (sid && new Date(voteSession.expiry).getTime() < Date.now()) {
            console.log("Session ID is valid but has expired.");
            const session = await db.collection("sid").findOne({ _id: new ObjectId(sid) });

            if (session) {
                console.log("Vote Session expired:", session.expiry);
                await db.collection("sid").deleteOne({ _id: new ObjectId(sid) });
                const statsCollection = db.collection("stats");
                await statsCollection.findOneAndUpdate(
                    {},
                    { $inc: { activeVotes: -1 } },
                    { returnDocument: "after" }
                );
            }

            return new NextResponse(
                JSON.stringify({ message: "Session ID is valid but has expired." }),
                { status: 401 }
            );
        }

        return new NextResponse(
            JSON.stringify(voteSession),
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

export async function POST(req: Request) {
    try {
        const { selectedVote } = await req.json();
        console.log("Received selectedVote:", selectedVote);

        const url = new URL(req.url);
        const sid = url.pathname.split("/").pop();

        if (!sid || !ObjectId.isValid(sid)) {
            console.log(`Invalid Session ID: ${sid}`);
            return new NextResponse(
                JSON.stringify({ message: "Invalid Session ID" }),
                { status: 400 }
            );
        }

        const { db } = await connectDB();
        const voteSession = await db.collection("sid").findOne({ _id: new ObjectId(sid) });

        if (!voteSession) {
            console.log("Session not found for ID:", sid);
            return new NextResponse(
                JSON.stringify({ message: "Session not found" }),
                { status: 404 }
            );
        }

        if (new Date(voteSession.expiry).getTime() < Date.now()) {
            console.log("Session ID is valid but has expired.");
            await db.collection("sid").deleteOne({ _id: new ObjectId(sid) });
            return new NextResponse(
                JSON.stringify({ message: "Session ID is valid but has expired." }),
                { status: 401 }
            );
        }

        const updatedVotes = voteSession.votes.map((vote: any) => {
            if (selectedVote.includes(vote.title)) {
                vote.votings += 1;
            }
            return vote;
        });

        const result = await db.collection("sid").updateOne(
            { _id: new ObjectId(sid) },
            { $set: { votes: updatedVotes } }
        );

        if (!result) {
            console.log("Failed to update votes.");
            return new NextResponse(
                JSON.stringify({ message: "Failed to update votes." }),
                { status: 500 }
            );
        }

        console.log("Vote updated successfully.");
        return new NextResponse(
            JSON.stringify({ message: "Vote updated successfully." }),
            { status: 200 }
        );

    } catch (err) {
        console.error("Error:", err);
        return new NextResponse(
            JSON.stringify({ message: err || "An unknown error occurred." }),
            { status: 500 }
        );
    }
}