import React from "react";
import styles from "./ReportComponent.css";
import TableRow from "./TableRow";
import getPatientEncounters from "../Pathology-getter/Pathology-patient-encounters-getter-resource";
import getEncounters from "../Pathology-getter/Pathology-encounter-getter-resource";

const ReportComponent = () => {
  const [encountersList, setEncountersList] = React.useState([]);
  // const [selectedEncounter, setSelectedEncounter] = React.useState();
  let selectedEncounter;

  React.useEffect(() => {
    getPatientEncounters("").then((encs) => {
      setEncountersList(encs.data.results);
    });
  }, []);

  const encounterInfo = (encUUID) => {
    getEncounters(encUUID).then((enc) => {
      return enc.data;
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={`omrs-bold ${styles.tr}`}>
          <td>Link to patient</td>
          <td>Patient name</td>
          <td>pathology request</td>
          <td>Phone number</td>
          <td>Sample status</td>
          <td>Date of Request</td>
          <td>Referral status</td>
          <td>Sample drop off?</td>
        </tr>
      </thead>
      <tbody>
        {encountersList.map((request) => (
          // foo.results.find(item => item.id === 2)

          <tr className={styles.tr} key={request.uuid}>
            <TableRow
              request={request}
              encounterInfo={encounterInfo(request.uuid)}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportComponent;
