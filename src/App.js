import React, { useState } from "react";
import "./App.css";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
function App() {
  return (
    <Card>
      {/* <TodoListFC /> */}
      <CardContent>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={yup.object().shape({
            name: yup.string().required("Please enter your name"),
            email: yup.string().required("Please enter your email").email(),
            password: yup
              .number()
              .required("Please enter your password")
              .min(15),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            validateField,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <StepsForm
                isSubmitting={isSubmitting}
                validateField={validateField}
              >
                <Field
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="your name"
                  component={TextField}
                  error={errors.name ? true : false}
                  helperText={errors.name && errors.name}
                />
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder=" your email"
                  component={TextField}
                  error={errors.email ? true : false}
                  helperText={errors.email && errors.email}
                />
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder=" your password"
                  component={TextField}
                  error={errors.password ? true : false}
                  helperText={errors.password && errors.password}
                />
              </StepsForm>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

const StepsForm = (props) => {
  const children = React.Children.toArray(props.children);
  const [step, setsteep] = useState(1);
  const GOBACK = () => {
    setsteep(step - 1);
  };
  const GONEXT = () => {
    // props.validateField(name);
    setsteep(step + 1);
  };
  return (
    <>
      {children[step - 1]}

      {step > 1 && (
        <Button onClick={GOBACK} variant="contained" color="inherit">
          Back
        </Button>
      )}

      {step < children.length && (
        <Button onClick={GONEXT} variant="contained" color="secondary">
          Next
        </Button>
      )}
      {step === children.length && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={props.isSubmitting}
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default App;
