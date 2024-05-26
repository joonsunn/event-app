export const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export const getDeltaDate = (date, daysDelta) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysDelta);
  const dd = String(newDate.getDate()).padStart(2, "0");
  const mm = String(newDate.getMonth() + 1).padStart(2, "0");
  const yyyy = newDate.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};