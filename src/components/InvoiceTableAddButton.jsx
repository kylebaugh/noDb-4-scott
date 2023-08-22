import './InvoiceTable.css';

const InvoiceTableAddButton = ({onAddClick}) => {

    return (
        <tr>
            <td></td>
            <td colSpan='4'>
                <button onClick={onAddClick}>Add</button>
            </td>
        </tr>
    )
}

export default InvoiceTableAddButton