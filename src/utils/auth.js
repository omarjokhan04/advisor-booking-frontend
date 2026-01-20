const ROLE_KEY = "role";

export function setRole(role) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY); // "student" | "advisor" | null
}

export function clearRole() {
  localStorage.removeItem(ROLE_KEY);
}
