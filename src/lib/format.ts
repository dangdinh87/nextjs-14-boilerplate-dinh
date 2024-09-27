export function formatDateToISO(date: string) {
  return new Date(date).toISOString();
}

export function formatDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}
