export function isAuthenticated(): boolean {
  return !!localStorage.getItem('authorization');
}
