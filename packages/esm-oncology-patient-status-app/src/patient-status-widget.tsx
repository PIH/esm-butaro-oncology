import React from "react";
import { Tile } from "carbon-components-react";
import { CardHeader } from "./cards";
import { useStage, useTreatmentPlan } from "./patient-status-widget.resource";
import styles from "./patient-status-widget.scss";

import { ValueTile } from "./value-tile";
import { DiagnosisTile } from "./tiles/diagnosis-tile";
import { StageTile } from "./tiles/stage-tile";
import { TreatmentPlanTile } from "./tiles/treatment-plan-tile";

interface PatientDashboardWidgetProps {
  patientUuid: string;
}

function PatientStatusWidget({ patientUuid }: PatientDashboardWidgetProps) {
  const { stage } = useStage(patientUuid);
  const { treatmentPlan } = useTreatmentPlan(patientUuid);

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
            <Tile light>
              <ValueTile label="Most recent Obs">{stage ?? "—"}</ValueTile>
            </Tile>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default PatientStatusWidget;
