import React from 'react';


const TableRow = (prop) => {
    return(
        <>
            <td>
                Link
            </td>
            <td>
                {prop.patient.family_name} {' '}
                {prop.patient.middle_name} {' '}
                {prop.patient.first_name} {' '}
            </td>
            <td>
                Link
            </td>
            <td>
                {prop.patient.phone_number}
            </td>
            <td>
                arrived at BDH
            </td>
            <td>
                {prop.request.encounter_datetime}
            </td>
            <td>
                -
            </td>
            <td>
                <input type='checkbox'/>
            </td>
        </>
    )
}

export default TableRow;