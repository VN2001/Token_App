import { Dimensions } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
} from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

// Responsive scale (width-based)
export const rs = (size) => scale(size);

// Responsive vertical scale
export const vs = (size) => verticalScale(size);

// Responsive font
export const rf = (size) => moderateScale(size);

// Optional helpers
export const screenWidth = width;
export const screenHeight = height;