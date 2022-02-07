const getCurrencySymbol = (curr) => {

  switch (curr) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    default:
      break;
  }
};

export { getCurrencySymbol };
