import { Tile } from "carbon-components-react";
import React from "react";
import { CardHeader } from "./cards";
import {
  useDiagnosis,
  useStage,
  useTreatmentPlan,
} from "./patient-status-widget.resource";
import styles from "./patient-status-widget.scss";
import { ValueTile } from "./value-tile";

interface PatientDashboardWidgetProps {
  patientUuid: string;
}

function PatientStatusWidget({ patientUuid }: PatientDashboardWidgetProps) {
  const { diagnosis, isError, isLoading, isValidating } =
    useDiagnosis(patientUuid);
  const { stage } = useStage(patientUuid);
  const { treatmentPlan } = useTreatmentPlan(patientUuid);

  return (
    <div className={styles.widgetCard}>
      <CardHeader title="Patient status">{null}</CardHeader>

      <table>
        <tr>
          <td>
            <Tile light>
              <ValueTile label="Diagnosis" value={diagnosis ?? "—"} />
            </Tile>
          </td>
          <td>
            <Tile light>
              <ValueTile label="Stage" value={stage ?? "-"} />
            </Tile>
          </td>
          <td>
            <Tile light>
              <ValueTile label="DST Plan" value={treatmentPlan ?? "—"} />
            </Tile>
          </td>
          <td>
            <Tile light>
              <ValueTile label="Most recent Obs" value={stage ?? "—"} />
            </Tile>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default PatientStatusWidget;
