import { NowRequest, NowResponse} from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db = null

async function connectToDatabase (uri: string) {
    if(cachedDb){
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const dbName = url.parse(uri).pathname.substr(1)
    
    const db = client.db(dbName)

    cachedDb = db

    return db
}

export default async (request: NowRequest, response: NowResponse) => {
    if(request.method === 'GET'){
        const db = await connectToDatabase(process.env.MONGODB_URI)
    
        const collection = db.collection('whishes')

        const data = await collection.find({}, {limit: 20, sort: [['createdAt', -1]]}).toArray()

        return response.status(201).json(data)
    }

    if(request.method === 'POST'){
        const { name, instagram, message } = request.body
    
        const db = await connectToDatabase(process.env.MONGODB_URI)
    
        const collection = db.collection('whishes')
    
        const data = {name, instagram, message, createdAt: new Date()}
    
        await collection.insertOne(data)
    
        return response.status(201).json(data)
    }
}