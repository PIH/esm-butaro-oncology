import { openmrsFetch } from "@openmrs/esm-framework";
import useSWR from "swr";

interface PatientProgramStateResponse {
  results: Array<{
    program: {
      name: string;
      allWorkflows: Array<{
        concept: {
          uuid: string;
          display: string;
        };
        retired: boolean;
        states: Array<{
          concept: {
            uuid: string;
          };
          retired: boolean;
        }>;
      }>;
    };
    states: Array<{
      endDate: string | null;
      state: {
        concept: {
          uuid: string;
          display: string;
        };
        retired: boolean;
      };
      voided: boolean;
    }>;
    voided: boolean;
  }>;
}

export function useDiagnosis(patientUuid: string) {
  const apiUrl = `/ws/rest/v1/programenrollment?patient=${patientUuid}&v=full`;
  const { data, error, isValidating } = useSWR<
    { data: PatientProgramStateResponse },
    Error
  >(apiUrl, openmrsFetch);

  // The diagnosis is kept in the program workflow state for the Oncology Program
  // for the DIAGNOSIS workflow. Unfortunately, the REST API won't simply tell us
  // what state a patient is in for a given workflow. It provides information about
  // all available workflows and all available states for a program; and it provides
  // a list of states that the patient is in. But those states do NOT tell us which
  // workflow they correspond to. So we compare the currently enrolled state to the
  // list of possible states for the workflow we need.
  let diagnosis: string | null = null;
  const oncologyEnrollment = data?.data.results.filter(
    (enrollment) =>
      !enrollment.voided && enrollment.program.name == "Oncology Program"
  )[0];
  if (oncologyEnrollment) {
    const diagnosisWorkflow = oncologyEnrollment.program.allWorkflows.filter(
      (workflow) =>
        !workflow.retired &&
        workflow.concept.uuid == "226ed7ad-b776-4b99-966d-fd818d3302c2"
    )[0];
    const diagnosisStateConceptUuids = diagnosisWorkflow.states
      .filter((state) => !state.retired)
      .map((state) => state.concept.uuid);
    const diagnosisState = oncologyEnrollment.states.filter(
      (state) =>
        !state.voided &&
        !state.state.retired &&
        !state.endDate &&
        diagnosisStateConceptUuids.includes(state.state.concept.uuid)
    )[0];
    diagnosis = diagnosisState?.state.concept.display;
  }

  return {
    diagnosis,
    isError: error,
    isLoading: !data && !error,
    isValidating,
  };
}

// Obs
interface ObsResponse {
  results: Array<{
    display: string;
    voided: boolean;
    value: {
      display: string;
    };
  }>;
}

function getObs(patientUuid: string, conceptUuid: string) {
  const apiUrl = `/ws/rest/v1/obs?patient=${patientUuid}&concept=${conceptUuid}&v=full`;
  const { data, error, isValidating } = useSWR<{ data: ObsResponse }, Error>(
    apiUrl,
    openmrsFetch
  );

  let obsValue: string | null = "null";
  const obsSelected = data?.data.results.filter(
    (observation) => !observation.voided
  )[0];

  obsValue = obsSelected?.value.display;
  return {
    obsValue,
    isError: error,
    isLoading: !data && !error,
    isValidating,
  };
}

export function useStage(patientUuid: string) {
  const obsValue = getObs(patientUuid, "e9cf4aed-34be-4c0a-9004-4294d9bb2d74");
  const stage = obsValue.obsValue;

  return {
    stage,
    isError: obsValue.isError,
    isLoading: obsValue.isLoading,
    isValidating: obsValue.isValidating,
  };
}

export function useTreatmentPlan(patientUuid: string) {
  const obsValue = getObs(patientUuid, "3cda0160-26fe-102b-80cb-0017a47871b2");
  const treatmentPlan = obsValue.obsValue;

  return {
    treatmentPlan,
    isError: obsValue.isError,
    isLoading: obsValue.isLoading,
    isValidating: obsValue.isValidating,
  };
}
