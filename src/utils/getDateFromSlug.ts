export default function getDateFromSlug(dateSlug: string[]) {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  if (dateSlug.length === 1) {
    const date = new Date(`${year}-${month}-${dateSlug[0]}`);
    return date;
  }

  if (dateSlug.length === 2) {
    if (dateSlug[1].length == 1) {
      dateSlug[1] = `0${dateSlug[1]}`;
    }
    if (dateSlug[0].length == 1) {
      dateSlug[0] = `0${dateSlug[0]}`;
    }
    const date = new Date(`${year}-${dateSlug[1]}-${dateSlug[0]}`);
    return date;
  }

  if (dateSlug[2].length == 2) {
    dateSlug[2] = `20${dateSlug[2]}`;
  }

  const date = new Date(`${dateSlug[2]}-${dateSlug[1]}-${dateSlug[0]}`);

  return date;
}
