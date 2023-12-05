import { redirect } from 'react-router-dom'

export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresAt');
  return redirect('/auth')
}