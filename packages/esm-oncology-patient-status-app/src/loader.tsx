import React from "react";
// import styles from './loader.scss';
import { InlineLoading } from "carbon-components-react";

const Loader: React.FC = () => {
  return <InlineLoading description={`Loading...`} />;
};

export default Loader;
