import { Tile } from "carbon-components-react";
import React from "react";
import { CardHeader } from "./cards";
import styles from "./patient-status-widget.scss";
import { ValueTile } from "./value-tile";

function PatientStatusWidget() {
  return (
    <div className={styles.widgetCard}>
      <CardHeader title="Patient status"></CardHeader>
      <Tile light>
        <ValueTile label="Diagnosis" value="Asthma" />
      </Tile>
    </div>
  );
}

export default PatientStatusWidget;
