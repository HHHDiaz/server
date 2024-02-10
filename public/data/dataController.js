const Data = require('./dataModel')
const { getPostData } = require('./utils')

async function getData(req, res) {
    try {
        const data = await Data.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
    } catch (error) {

    }
}

async function getDataId(req, res, id) {
    try {
        const data = await Data.findById(id)
        if (!id) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ "message": "Data not found" }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(data))
        }
    } catch (error) {

    }
}

async function createData(req, res) {
    try {

        const body = await getPostData(req)

        const { user, age } = JSON.parse(body)

        const data = {
            user,
            age
        }

        const newData = await Data.create(data)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newData))

    } catch (error) {

    }
}

async function updateData(req, res, id) {
    try {
        const data = await Data.findById(id)
        if (!id) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ "message": "Data not found" }))
        } else {
            const body = await getPostData(req)

            const { user, age } = JSON.parse(body)

            const data = {
                user: user || data.user,
                age: age || data.age
            }

            const putData = await Data.update(id, data)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(putData))
        }
    } catch (err) {

    }
}

async function deleteData(req, res, id) {
    try {
        const data = await Data.findById(id)
        if (!id) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ "message": "Data not found" }))
        } else {
            await Data.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ "message": `N° id: ${id} borrado...` }))
        }
    } catch (err) {

    }
}

module.exports = {
    getData,
    getDataId,
    createData,
    updateData,
    deleteData
}