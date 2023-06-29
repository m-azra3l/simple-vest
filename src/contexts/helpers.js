// Formating percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    });
  };
  