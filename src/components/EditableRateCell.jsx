import './InvoiceTable.css';
import formatCurrency from '../utils/formatCurrency.js';

const EditableRateCell = ({value, isEditing, onValueChange, updateRateAndHour, id}) => {
    const handleUpdate = (e) => {
        onValueChange(e.target.value)
        updateRateAndHour(id, e.target.value, 'rate')
    }

    return isEditing ? (
        <td>
            $<input type="text" value={value} onChange={(e) => handleUpdate(e)}/>/hr
        </td>
    ) : (
        <td>{formatCurrency(value)}/hr</td>
    )
}

export default EditableRateCell