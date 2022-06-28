import React from "react";
import { CardHeader } from "./cards";
import styles from "./patient-status-widget.scss";
import { DiagnosisTile } from "./tiles/diagnosis-tile";
import { StageTile } from "./tiles/stage-tile";
import { TreatmentPlanTile } from "./tiles/treatment-plan-tile";
import { NextVisitTile } from "./tiles/next-visit-tile";

interface PatientDashboardWidgetProps {
  patientUuid: string;
}

function PatientStatusWidget({ patientUuid }: PatientDashboardWidgetProps) {
  return (
    <div className={styles.widgetCard}>
      <CardHeader title="Patient status">{null}</CardHeader>

      <table>
        <tr>
          <td>
            <DiagnosisTile patientUuid={patientUuid} />
          </td>
          <td>
            <StageTile patientUuid={patientUuid} />
          </td>
          <td>
            <TreatmentPlanTile patientUuid={patientUuid} />
          </td>
          <td>
            <NextVisitTile
              patientUuid={patientUuid}
              codeUuids={
                "8eba01f9-2ea0-49d0-b61b-8d6001e2ff7b,8c3b045a-aa94-4361-b2e9-8a80c26ccede,5efb51db-4e71-497d-822c-91501ac167f6,bf79952c-4c49-47aa-b8dc-bb4195e734c0,ff20420e-745b-4d99-92a0-dea681b9493d,a7aa7d20-3520-4d8a-9324-f7b8f6a3b109,7ec61380-3cde-4b7a-a322-4678a0b460c4,56001c5f-1a8a-4d80-b255-d1de983a852e,ea843dde-d33b-4687-88cb-5cd76111b48b,6de4e3ee-fe8d-427e-b38f-1703e80f8513"
              }
            />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default PatientStatusWidget;
