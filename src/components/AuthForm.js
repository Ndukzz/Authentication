import { Form, Link , useSearchParams} from 'react-router-dom';  //  useSearchParams gets Query parameters

import classes from './AuthForm.module.css';

function AuthForm() {
  const [ searchParams ] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";


  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
           <Link to={`?mode=${isLogin ? "signup" : "login"}`} > {/*  the Query parameter is declared  */}
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
