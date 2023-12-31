import './InvoiceTable.css';

const EditiableDescriptionCell = ({value, isEditing, onValueChange}) => {
    return isEditing ? (
        <td>
            <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)}/>
        </td>
    ) : (
        <td>{value}</td>
    )
}

export default EditiableDescriptionCell