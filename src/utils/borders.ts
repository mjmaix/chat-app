const showBorders = true;

function DevEmpty(obj: any) {
  return showBorders && __DEV__ ? obj : {};
}

export const DevBorders = (color = 'red', width = 1) => {
  return DevEmpty({
    borderColor: color,
    borderWidth: width,
  });
};
