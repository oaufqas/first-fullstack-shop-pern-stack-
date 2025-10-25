import express from 'express'
import {config} from 'dotenv'
import sequelize from './db.js'
import { fileURLToPath } from 'url'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import ErrorHandler from './middleware/ErrorHandlingMiddleware.js'
import path from 'path'
const dir = path.dirname(fileURLToPath(import.meta.url))
config()

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()

app.use((req, res, next) => {
    console.log('REQUEST INCOMING:', new Date().toISOString())
    console.log('Method:', req.method)
    console.log('URL:', req.url)
    console.log('User-Agent:', req.headers['user-agent'])
    console.log('---')
    next()
})

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(dir, '..', 'client', 'dist')))
app.use('/static', express.static(path.resolve(dir, 'static')))

app.use('/api', router)

app.use(ErrorHandler)

app.get(/\/(.*)/, (req, res) => {
    res.sendFile(path.resolve(dir, '..', 'client', 'dist', 'index.html'))
})

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('database connected')
        // await sequelize.sync({force: true })
        // await sequelize.sync({alter: true})
        app.listen(PORT, HOST, () => {
            console.log(`Server started on http://${HOST}:${PORT}`)
        })

    } catch (e) {
        console.error(e)
    }
}



start()