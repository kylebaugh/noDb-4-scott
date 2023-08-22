import './InvoiceTable.css';

import EditableRowModeButtons from './EditiableRowModeButtons.jsx';
import EditiableDescriptionCell from './EditableDescriptionCell.jsx';
import EditableRateCell from './EditableRateCell.jsx';
import EditiableHoursCell from './EditableHoursCell.jsx';
import formatCurrency from '../utils/formatCurrency.js';
import { useState } from 'react';
import axios from 'axios'

const InvoiceTableRow = ({initialInvoiceData, initialIsEditing, onDeleteClick, total2, updateRateAndHour, id}) => {
    const [isEditing, setIsEditing] = useState(initialIsEditing)

    const [description, setDescription] = useState(initialInvoiceData.description)
    const [rate, setRate] = useState(initialInvoiceData.rate)
    const [hours, setHours] = useState(initialInvoiceData.hours)

    const setEditMode = () => setIsEditing(true)
    const setNormalMode = async () => {
        const {data} = await axios.post(`/api/invoice/${id}`, {
            description,
            rate,
            hours
        })

        if(!data.error){
            setDescription(data.description)
            setRate(data.rate)
            setHours(data.hours)
        }

        setIsEditing(false)


        // console.log('hit')
        // setIsEditing(false)
        // total2(rate, hours)
    }


    // const {description, rate, hours} = initialInvoiceData

    return (
        <tr>
            <EditableRowModeButtons isEditing={isEditing} onEditClick={setEditMode} onSaveClick={setNormalMode} deleteClick={onDeleteClick}/>
            <EditiableDescriptionCell value={description} isEditing={isEditing} onValueChange={setDescription}/>
            <EditableRateCell value={rate} isEditing={isEditing} onValueChange={setRate} updateRateAndHour={updateRateAndHour} id={id}/>
            <EditiableHoursCell value={hours} isEditing={isEditing} onValueChange={setHours} updateRateAndHour={updateRateAndHour} id={id}/>
            <td>{formatCurrency(rate * hours)}</td>
        </tr>
    )

}

export default InvoiceTableRow