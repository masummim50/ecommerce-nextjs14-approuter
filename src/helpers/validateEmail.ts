export default function validateEmail(email: string): boolean {
  // Regular expression for validating email addresses
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
