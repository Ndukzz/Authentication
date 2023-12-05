import { redirect } from "react-router-dom"

export function getTokenDuration() {
  //  GETS THE EXPIRATION TIMES AND DEDUCTS IT TO MAKE SURE THAT THE TOKEN IS NOT EXPIRED
  const storedExpirationDate = localStorage.getItem('expiresAt');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime()  // VALID = +VE VALUE
  return duration;
}

export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken()
}

//  THIS CHECKS IF THERE IS AN AUTH TOKEN AND IS USED FOR ROUTE PROTECTION
export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth")
  }

  return null
}