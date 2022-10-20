import { Field } from "formik";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { HealthCheckRating } from "../types";
import { assertNever } from "../utils/assertNever";
import { HealthCheckRatingOption, SelectField, TextField } from "./FormField";

const healthCheckRatingOptions: Array<HealthCheckRatingOption> = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

const EntryFormDetails: React.FC<{
  values: EntryFormValues;
}> = ({ values }) => {
  const { type } = values;
  switch (type) {
    case "Hospital":
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="Discharge date"
            name="discharge.date"
            component={TextField}
            value={values.discharge.date}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
            value={values.discharge.criteria}
          />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
            value={values.employerName}
          />
          <Field
            label="Sick leave start date"
            placeholder="Sick leave start date"
            name="sickLeave.startDate"
            component={TextField}
            value={values.sickLeave?.startDate}
          />
          <Field
            label="Sick leave end date"
            placeholder="Sick leave end date"
            name="sickLeave.endDate"
            component={TextField}
            value={values.sickLeave?.endDate}
          />
        </>
      );
    case "HealthCheck":
      return (
        <SelectField
          name="healthCheckRating"
          label="Health check rating"
          options={healthCheckRatingOptions}
        />
      );
    default:
      return assertNever(type);
  }
};

export default EntryFormDetails;
