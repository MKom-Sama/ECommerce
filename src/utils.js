import DOMPurify from "dompurify";

// Currency Icons
import USDIcon from "./assets/svg/currIcons/USD.svg";
import GBPIcon from "./assets/svg/currIcons/GBP.svg";
import JPYIcon from "./assets/svg/currIcons/JPY.svg";
import RUBIcon from "./assets/svg/currIcons/RUB.svg";
import A$Icon from "./assets/svg/currIcons/A$.svg";

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

const objectEquals = (obj1, obj2) => {
  for (var i in obj1) {
    if (obj1.hasOwnProperty(i)) {
      if (!obj2.hasOwnProperty(i)) return false;
      if (obj1[i] != obj2[i]) return false;
    }
  }
  for (var i in obj2) {
    if (obj2.hasOwnProperty(i)) {
      if (!obj1.hasOwnProperty(i)) return false;
      if (obj1[i] != obj2[i]) return false;
    }
  }
  return true;
};

function shortUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

const getCurrencyIcon = (currName) => {
  switch (currName) {
    case "USD":
      return USDIcon;
    case "GBP":
      return GBPIcon;
    case "JPY":
      return JPYIcon;
    case "RUB":
      return RUBIcon;
    case "AUD":
      return A$Icon;
    default:
      break;
  }
}
export { getCurrencySymbol,getCurrencyIcon, sanitizeHTML, objectEquals, shortUID };
