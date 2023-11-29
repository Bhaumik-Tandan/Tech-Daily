import * as Clipboard from "expo-clipboard";

const getClipBoard = () => {
  return Clipboard.getStringAsync();
};

export default getClipBoard;
