import './InvoiceTable.css';

// import EditableRowModeButtons from './EditiableRowModeButtons.jsx';
// import EditiableDescriptionCell from './EditableDescriptionCell.jsx';
// import EditableRateCell from './EditableRateCell.jsx';
// import EditiableHoursCell from './EditableHoursCell.jsx';
import InvoiceTableHeader from './InvoiceTableHeader.jsx';
import InvoiceTableAddButton from './InvoiceTableAddButton.jsx';
import InvoiceTableRow from './InvoiceTableRow.jsx';
import {useState} from 'react'
import axios from 'axios'

let myId = 4

const InvoiceTable = ({initialInvoiceData}) => {

    const [invoiceList, setInvoiceList] = useState(initialInvoiceData)
    const [total, setTotal] = useState(invoiceList.reduce((a,c) => a + (c.rate * c.hours), 0))

    console.log(invoiceList)

    let total2 = (rate, hour) =>{
        console.log(invoiceList)
        let newTotal = invoiceList.reduce((a,c) => a + (c.rate * c.hours), 0) + (rate * hour)
        setTotal(newTotal)
    }

    const updateRateAndHour = (id, newValue, rateOrHour) => {
        let temp = [...invoiceList]
        let index = temp.findIndex(el => el.id === id)
        if(rateOrHour === 'rate'){
            temp[index].rate = +newValue
        }else{
            temp[index].hours = +newValue
        }

        setInvoiceList(temp)
    }

    // console.log('invoice table')

    const addInvoiceRow = async () => {
        const {data} = await axios.post('/api/invoice', {description: 'Description'})

        const newInvoice = {...data}
        setInvoiceList([...invoiceList, newInvoice])

        // set a base value of our current invoice list
        // Create a new object that holds values for new row
        // push that object into base value of inovice list
        // set our state invoice list to match the base

        // const newInvoiceList = [...invoiceList]

        // const newInvoiceRow = {
        //     id: myId,
        //     description: 'Description',
        //     rate: '',
        //     hours: '',
        //     isEditing: true
        // }

        // newInvoiceList.push(newInvoiceRow)

        // setInvoiceList(newInvoiceList)

        // myId += 1
    }

    const deleteInvoiceRow = async (id) => {
        const {data} = await axios.post(`/api/invoice/delete/${id}`)

        if(!data.error){
            const newInvoiceList = [...invoiceList]
            const index = newInvoiceList.findIndex((invoice) => invoice.id === id)
            newInvoiceList.splice(index, 1)
            setInvoiceList(newInvoiceList)
        }

    }


    const rows = invoiceList.map((invoiceItem) => {
        const {id, description, rate, hours, isEditing} = invoiceItem

        return (
            <InvoiceTableRow
                key={id}
                id={id}
                initialInvoiceData={{description, rate, hours}}
                initialIsEditing={isEditing}
                onDeleteClick={() => deleteInvoiceRow(id)}
                total2={total2}
                updateRateAndHour={updateRateAndHour}
            />
        )
    })

    return (
        <div>

        <table>
            <thead>
                <InvoiceTableHeader />
            </thead>

            <tbody>
                {rows}
                {/* <InvoiceTableRow
                    initialInvoiceData={{
                        description: 'Janitor',
                        rate: 45,
                        hours: 1
                    }}
                    initialIsEditing={false}
                />

                <InvoiceTableRow
                    initialInvoiceData={{
                        description: 'Astronaut',
                        rate: 200,
                        hours: 1000
                    }}
                    initialIsEditing={true}
                /> */}



                {/* <tr>
                <EditableRowModeButtons isEditing={false}/>
                <EditiableDescriptionCell value='Web Development' isEditing={false}/>
                <EditableRateCell value={25} isEditing={false}/>
                <EditiableHoursCell value={10} isEditing={false}/>
                </tr>

                <tr>
                <EditableRowModeButtons isEditing={true}/>
                <EditiableDescriptionCell value='Copywriting' isEditing={true}/>
                <EditableRateCell value={20} isEditing={true}/>
                <EditiableHoursCell value={8} isEditing={true}/>
                </tr> */}

            </tbody>

            <tfoot>
                <InvoiceTableAddButton onAddClick={addInvoiceRow}/>
            </tfoot>

        </table>

            <p>Total: {total}</p>
        </div>

    )
}

export default InvoiceTable
