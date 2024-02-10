const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const { getData, getDataId, createData, updateData, deleteData } = require('./data/dataController')

app
    .use('/static', express.static(path.resolve(__dirname, 'static')))
    .get('/*', (req, res) => {
        if (req.url == '/api/data' && req.method == 'GET') {
            getData(req, res)
        }
        if (req.url.match(/\/api\/data\/([0-9]+)/) && req.method == 'GET') {
            const id = req.url.split('/')[3]
            getDataId(req, res, id)
        } else {
            res.sendFile(path.resolve(__dirname, 'index.html'))
        }
    })
    .post('/api/data', (req, res) => {
        createData(req, res)
    })
    .put('/*', (req, res) => {
        if (req.url.match(/\/api\/data\/([0-9]+)/)) {
            const id = req.url.split('/')[3]
            updateData(req, res, id)
        }
    })
    .delete('/*', (req, res) => {
        if (req.url.match(/\/api\/data\/([0-9]+)/)) {
            const id = req.url.split('/')[3]
            deleteData(req, res, id)
        }
    })
    .listen(PORT, () => console.log(`Server running on port ${PORT}`))