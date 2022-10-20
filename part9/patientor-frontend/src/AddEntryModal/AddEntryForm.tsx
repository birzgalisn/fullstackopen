import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik, FormikProps } from "formik";
import React from "react";
import EntryFormDetails from "../components/EntryFormDetails";

import {
  DiagnosisSelection,
  TextField,
  TypeOption,
  TypeSelection,
} from "../components/FormField";
import { useStateValue } from "../state";
import {
  BaseEntryWithoutId,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
} from "../types";
import { assertNever } from "../utils/assertNever";

export type EntryFormValues = EntryWithoutId;

export type InitialValueError = {
  [field: string]: string;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: Array<TypeOption> = [
  { name: "Hospital", type: "Hospital" },
  { name: "Health check", type: "HealthCheck" },
  { name: "Occupational healthcare", type: "OccupationalHealthcare" },
];

const getInitialValues = (type: Entry["type"]): EntryWithoutId => {
  const base: BaseEntryWithoutId = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  };

  switch (type) {
    case "Hospital":
      return { ...base, type, discharge: { date: "", criteria: "" } };
    case "HealthCheck":
      return { ...base, type, healthCheckRating: HealthCheckRating.Healthy };
    case "OccupationalHealthcare":
      return {
        ...base,
        type,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      };
    default:
      return assertNever(type);
  }
};

const validateInitialValues = (values: EntryFormValues): InitialValueError => {
  const requiredError = "Field is required";
  const errors: InitialValueError = {};
  const { type } = values;

  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }

  if (type === "Hospital") {
    return errors;
  } else if (type === "HealthCheck") {
    return errors;
  } else if (type === "OccupationalHealthcare") {
    if (!values.employerName) {
      errors.employerName = requiredError;
    }
    return errors;
  }

  return assertNever(type);
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] = React.useState<Entry["type"]>("Hospital");
  const [{ diagnoses }] = useStateValue();
  const formikRef = React.useRef<FormikProps<EntryWithoutId> | null>();

  const initialValues = React.useMemo(() => {
    return getInitialValues(type);
  }, [type]);

  React.useEffect(() => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  }, [initialValues]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => validateInitialValues(values)}
      innerRef={(ref) => {
        formikRef.current = ref;
      }}
      enableReinitialize={true}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <TypeSelection
              options={typeOptions}
              selectedType={type}
              setSelectedType={setType}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
              value={values.date}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              value={values.description}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              value={values.specialist}
            />

            <EntryFormDetails values={values} />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
