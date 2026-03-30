import { Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const rs = (size) => scale(size);
export const vs = (size) => verticalScale(size);
export const rf = (size) => moderateScale(size);

export const { width, height } = Dimensions.get("window");

export const C = {
  purple: "#7B5FEB",
  purpleLight: "#EDE8FC",
  purpleMid: "#C4B0F8",
  purpleDark: "#6347D4",
  slotBadgeBg: "#32225A",
  btnIconBg: "#2D1B6B",
  textDark: "#1A1035",
  textMid: "#7B6BA8",
  bg: "#FFFFFF",
  cardBg: "#F0EEF5",
  white: "#FFFFFF",
  green: "#22C55E",
  red: "#E05252",
  grey: "#F1EFEF",
};

export const HOSPITALS = [
  {
    id: 1,
    name: "Apollo Hospitals",
    address: "Anna Nagar (East), Road 45, Chennai",
    shortAddress: "Anna Nagar (East), Road 45 ...",
    avatar: "🏥",
    token: "02",
    total: "50",
    date: "Feb 12, 2026",
    time: "10:30 AM",
    amount: "₹199.00",
  },
  {
    id: 2,
    name: "MIOT International",
    address: "Mount Poonamallee Rd, Manapakkam",
    shortAddress: "Mount Poonamallee Rd ...",
    avatar: "🏨",
    token: "07",
    total: "40",
    date: "Feb 13, 2026",
    time: "02:15 PM",
    amount: "₹149.00",
  },
  {
    id: 3,
    name: "Fortis Malar Hospital",
    address: "Adyar, Chennai - 600 020",
    shortAddress: "Adyar, Chennai - 600 020 ...",
    avatar: "⚕️",
    token: "15",
    total: "60",
    date: "Feb 14, 2026",
    time: "04:45 PM",
    amount: "₹249.00",
  },
  {
    id: 4,
    name: "Sri Ramachandra Hospital",
    address: "Porur, Chennai - 600 116",
    shortAddress: "Porur, Chennai - 600 116 ...",
    avatar: "🩺",
    token: "03",
    total: "35",
    date: "Feb 15, 2026",
    time: "09:00 AM",
    amount: "₹299.00",
  },
  {
    id: 5,
    name: "Kauvery Hospital",
    address: "Alwarpet, Chennai - 600 018",
    shortAddress: "Alwarpet, Chennai - 600 018 ...",
    avatar: "🏪",
    token: "11",
    total: "45",
    date: "Feb 16, 2026",
    time: "11:30 AM",
    amount: "₹179.00",
  },
];