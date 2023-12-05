import { json, redirect } from 'react-router-dom'
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action( {request} ) {   // the data is fetched from the Form in <AuthForm />
  const searchParams = new URL(request.url).searchParams   //  we did'nt use the hook bcuz this is not a component
  const mode = searchParams.get('mode') || "signup"
  console.log("Testing");

  if (mode !== 'login' && mode !== 'signup') {
    throw json({message: 'Unsupported mode'}, {status: 422})
  }

  const data = await request.formData()
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }
  console.log(authData);

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });
  
  // HANDLING THE RESPONSES
  
  if (response.status === 422 || response.status === 401) {  // 422 => Validation Errors, 401 => Invalid credentials
    console.log("error 422 || 401");
    return response
  }
      
  if (!response.ok) {
    console.log("!ok");
    throw json({message: "could not authenticate user"}, { status: 500})
  }

  //  manage auth token
  return redirect('/')
}