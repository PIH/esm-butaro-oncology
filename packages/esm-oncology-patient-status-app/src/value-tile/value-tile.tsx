import React from "react";
import styles from "./value-tile.scss";

export interface ValueTileProps {
  label: string;
  value: string | number;
}

export function ValueTile({ label, value }: ValueTileProps) {
  return (
    <div>
      <p className={styles.label}>{label}</p>
      <p className={styles.content}>
        <span className={styles.value}>{value}</span>
      </p>
    </div>
  );
}
