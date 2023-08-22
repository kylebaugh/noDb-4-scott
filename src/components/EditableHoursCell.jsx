import './InvoiceTable.css';

const EditiableHoursCell = ({value, isEditing, onValueChange, updateRateAndHour, id }) => {

    const handleUpdate = (e) => {
        onValueChange(e.target.value)
        updateRateAndHour(id, e.target.value, 'hour')
    }

    return isEditing ? (
        <td>
            <input type="text" value={value} onChange={(e) => handleUpdate(e)}/>
        </td>
    ) : (
        <td>{value}</td>
    )
}

export default EditiableHoursCell