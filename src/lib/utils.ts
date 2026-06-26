export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatStatus(status?: string) {
  if (!status) return "Available";
  return status.charAt(0).toUpperCase() + status.slice(1);
}






