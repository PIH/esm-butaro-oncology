import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
};

function setupOpenMRS() {
  const moduleName = "@openmrs/esm-oncology-patient-status-app";

  const options = {
    featureName: "Oncology Patient Status",
    moduleName,
  };

  return {
    extensions: [
      {
        id: "Patient status",
        load: getAsyncLifecycle(
          () => import("./patient-status-widget"),
          options
        ),
        meta: {
          columnSpan: 4,
        },
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
