import { Tile } from "carbon-components-react";
import React from "react";
import { CardHeader } from "./cards";
import { useDiagnosis } from "./patient-status-widget.resource";
import styles from "./patient-status-widget.scss";
import { ValueTile } from "./value-tile";

interface PatientDashboardWidgetProps {
  patientUuid: string;
}

function PatientStatusWidget({ patientUuid }: PatientDashboardWidgetProps) {
  const { diagnosis, isError, isLoading, isValidating } =
    useDiagnosis(patientUuid);

  return (
    <div className={styles.widgetCard}>
      <CardHeader title="Patient status">{null}</CardHeader>
      <Tile light>
        <ValueTile label="Diagnosis" value={diagnosis ?? "—"} />
      </Tile>
    </div>
  );
}

export default PatientStatusWidget;
