import DOMPurify from "dompurify";

const getCurrencySymbol = (curr) => {
  switch (curr) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    case "AUD":
      return "A$";
    default:
      break;
  }
};

const sanitizeHTML = (data) => ({
  __html: DOMPurify.sanitize(data),
});

export { getCurrencySymbol, sanitizeHTML };
