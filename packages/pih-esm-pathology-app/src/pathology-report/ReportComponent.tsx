import React from 'react';
import styles from './ReportComponent.css';
import TableRow from './TableRow';
import getEncounters from '../Pathology-getter/Pathology-encounters-getter-resource'

const patientList = [
    {
        patient_id: 22,
        first_name: 'Richard',
        middle_name: 'Reagan',
        family_name: 'Ruguma',
        phone_number: '0788446672'
    },
    {
        patient_id: 15,
        first_name: 'Michelle',
        middle_name: '',
        family_name: 'Nyiramwiza',
        phone_number: '0788112233'
    },
    {
        patient_id: 30,
        first_name: 'Jelome',
        middle_name: '',
        family_name: 'Nteziryayo',
        phone_number: '0788338899'
    },

]
const pathologyRequests = [
    {
        encounter_id: 10,
        patient_id: 22,
        location_id: 20,
        form_id: 11,
        encounter_datetime: '2020-07-06 00:00:00',
        creator: 22,
        date_created: '2020-07-07 09:36:33',
        voided: false,
         
    },
    {
        encounter_id: 11,
        patient_id: 30,
        location_id: 20,
        form_id: 11,
        encounter_datetime: '2020-07-07 00:00:00',
        creator: 11,
        date_created: '2020-07-08 09:36:33',
        voided: false,
         
    },
    {
        encounter_id: 12,
        patient_id: 15,
        location_id: 20,
        form_id: 11,
        encounter_datetime: '2020-07-09 00:00:00',
        creator: 11,
        date_created: '2020-07-08 10:36:33',
        voided: false,
         
    },
]


const ReportComponent = () => {
    const [fromDate, setFromDate] = React.useState(new Date());
    const [toDate, setToDate] = React.useState(new Date());
    const [encountersList, setEncountersList] = React.useState([]);

    const selectPatient = (patient_id) =>{
        const patientSelected = patientList.find(pat => pat.patient_id === patient_id)
        
        return patientSelected;
    }

    React.useEffect(() => {
        setEncountersList(pathologyRequests);
        getEncounters('').then( (encs) =>  {console.log(encs)});

    },[]);
    // const testingDatabaseFetch = getEncounters;
    // console.log(testingDatabaseFetch)
    
    return (
        
        <table className={styles.table}>
            <thead>
                <tr className={`omrs-bold ${styles.tr}`}>
                    <td>
                        Link to patient
                    </td> 
                    <td>
                        Patient name
                    </td> 
                    <td>
                        pathology request
                    </td> 
                    <td>
                        Phone number
                    </td> 
                    <td>
                        Sample status
                    </td>
                    <td>
                        Date of Request
                    </td>
                    <td>
                        Referral status
                    </td>
                    <td>
                        Sample drop off?
                    </td>
                
                </tr>
            </thead>
            <tbody>
                {encountersList.map((request)=> (
                    // foo.results.find(item => item.id === 2)
                    

                    <tr className={styles.tr} key={request.encounter_id}>
                        
                        <TableRow request={request} patient={selectPatient(request.patient_id)}/>
                        
                    </tr>
                    
                ))}
                
                    
            </tbody>
        </table>
    )
}

export default ReportComponent


