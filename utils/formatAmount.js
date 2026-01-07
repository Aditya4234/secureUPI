export function formatAmount(amount) {
  if (typeof amount !== "number") {
    amount = parseFloat(amount) || 0;
  }
  return amount.toFixed(2);
}

export function formatCurrency(amount) {
  return `₹${formatAmount(amount)}`;
}

export function formatCompactAmount(amount) {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
}

