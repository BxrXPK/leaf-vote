import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI || '';
const OPTIONS = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    client = new MongoClient(URI, OPTIONS);
    clientPromise = client.connect();
    console.log("Connected to database");
} else {
    client = new MongoClient(URI, OPTIONS);
    clientPromise = client.connect();
    console.log("Connected to database");
}

export async function connectDB() {
    const client = await clientPromise;
    const db = client.db();
    return { client, db };
}