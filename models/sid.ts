import mongoose from "mongoose";

export interface Isid {
    sessionTitle: string;
    expiry: Date;
    votes: [{
        title: string;
        id: number;
        votings: number;
    }];
}

const sidSchema = new mongoose.Schema<Isid>({
    sessionTitle: { type: String, required: true },
    expiry: { type: Date, required: true },
    votes: [
        {
            title: { type: String, required: true },
            id: { type: Number, required: true },
            votings: { type: Number, required: true },
        },
    ],
});

const Sid = mongoose.models.Sid || mongoose.model<Isid>("Sid", sidSchema);

export { Sid };