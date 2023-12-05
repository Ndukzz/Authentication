import { useEffect } from "react"
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();
   
  useEffect(() => {
    // THE TOKEN EXPIRES IN 1HR
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, {action: '/logout', method: 'post'});
      return;
    }

    const tokenDuration = getTokenDuration()

    setTimeout(()=> {
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration )   // using the token time to setTimeout for auto logout 
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
