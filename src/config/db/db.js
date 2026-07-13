import { MongoClient, ServerApiVersion } from "mongodb";


export const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.hojma.mongodb.net:27017,cluster0-shard-00-01.hojma.mongodb.net:27017,cluster0-shard-00-02.hojma.mongodb.net:27017/?ssl=true&replicaSet=atlas-c634yu-shard-0&authSource=admin&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});