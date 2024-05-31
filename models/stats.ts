import mongoose from "mongoose";

export interface Istats {
    activeVotes: number;
    totalVisitors: number;
    totalCreated: number;
}

const statsSchema = new mongoose.Schema<Istats>({
    activeVotes: { type: Number, default: 0, required: true },
    totalVisitors: { type: Number, default: 0, required: true },
    totalCreated: { type: Number, default: 0, required: true },
});

const Stats = mongoose.models.Stats || mongoose.model<Istats>("Stats", statsSchema);

export { Stats };