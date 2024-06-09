export function deleteSessionToken() {
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.location.href = "/dashboard/";
}
