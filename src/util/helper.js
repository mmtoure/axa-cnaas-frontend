export  const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("fr-FR") : "—";

export const formatMoney = (value) =>
  value !== null && value !== undefined
    ? `${value.toLocaleString("fr-FR")} FCFA`
    : "—";