import { Form, Link, useSearchParams, useActionData, useNavigation } from "react-router-dom"; //  useSearchParams gets Query parameters

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();  // fetches the data from the nearest action( attached to component ) in the application
  const navigation = useNavigation()

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === 'submitting';

  console.log(data);
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {/* DISPLAING ERRORS  */}
        {data && data.errors && (
          // Object.values gets the values out of the key/value pairs of data.errors and maps it out
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p> }
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>  //mode => QueryParameter/searchParameter(Hook^)
            {" "}
            {/*  the Query parameter is declared  */}
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
