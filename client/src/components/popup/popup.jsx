import GameStartTimer from "./GameStartTimer";

export const popup = (popupType) => {
  switch (popupType) {
    case "middleToastPopup":
    case "TostPopUp":
      return <GameStartTimer />;
    default:
      break;
  }
};
