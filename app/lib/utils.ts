// This is just for example. Typically you would get a user from the session.
// By making it reusable, you would only have to get the userId from the session
// in one place. This makes it portable.
export function getUserId() {
  return 'test'
}
