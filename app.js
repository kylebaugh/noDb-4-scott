// import all packages
import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'


// set up app instance
const app = express()

// define port
const port = 8000
let myId = 4

// set up middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())

ViteExpress.config({printViteDevServerHost: true})

const TEST_DATA = [
    { id: 0, description: 'Janitor', rate: 50, hours: 4 },
    { id: 1, description: 'Astronaut', rate: 50, hours: 2 },
    { id: 2, description: 'Website design', rate: 50, hours: 5 },
    { id: 3, description: 'Website development', rate: 100, hours: 5 },
  ];

// Routes go here

app.get('/api/invoices', (req, res) => {
    res.json(TEST_DATA)
})

app.post('/api/invoice', (req, res) => {
    console.log(req.body)
    const {description} = req.body

    const newInvoiceRow = {
        id: myId,
        description: description || 'Description',
        rate: 0,
        hours: 0,
        isEditing: true
    }

    TEST_DATA.push(newInvoiceRow)

    myId += 1

    res.json(newInvoiceRow)
})

app.post('/api/invoice/delete/:id', (req, res) => {
    // grab id from params
    // locate which index in test data matches
    // splice out that index
    // return the id to the front end

    const {id} = req.params

    const index = TEST_DATA.findIndex((el) => el.id === +id)

    if(index === -1){
        res.status(404).json({error: `Item with ID ${id} was not found`})
    } else {
        TEST_DATA.splice(index, 1)
        res.json({id: +id})
    }

})


app.post('/api/invoice/:id', (req, res) => {
    // grab id from params
    // grab description, rate, hours from body
    // Use findIndex to get specific object in TestData
    // set a variable for specific object from TEST DATA
    // use dot notation to update the properties on that object
    // return updated object to front end in json

    const {id} = req.params
    const {description, rate, hours} = req.body

    const index = TEST_DATA.findIndex((el) => el.id === +id)

    const item = TEST_DATA[index]

    // if(description){
        item.description = description ?? item.description
    // }

    // if(+rate){
        item.rate = +rate ?? item.rate
    // }

    // if(+hours){
        item.hours = +hours ?? item.hours
    // }

    res.json(item)

})

// open up our server
ViteExpress.listen(app, port, () => console.log(`Avengers assemble on http://localhost:${port}`))














