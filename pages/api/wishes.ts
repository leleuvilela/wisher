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

        const {page} = request.query

        const collection = db.collection('whishes')

        const data = await collection.find({}, {sort: [['createdAt', -1]]}).skip( +page > 0 ? ( ( +page - 1 ) * 20 ) : 0 ).limit( 20 ).toArray()

        return response.status(201).json(data)
    }

    if(request.method === 'POST'){
        let { name, instagram, message, email } = request.body

        if(instagram[0] === '@') instagram = instagram.substr(1)
    
        const db = await connectToDatabase(process.env.MONGODB_URI)
    
        const collection = db.collection('whishes')
    
        const data = {name, instagram, message, email, createdAt: new Date()}
    
        await collection.insertOne(data)
    
        return response.status(201).json(data)
    }
}