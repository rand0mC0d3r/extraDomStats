export const extensionIdentifier = 'extra-dom-stats'
export const relevantElements = document.querySelectorAll(`:not(#${extensionIdentifier}):not(#${extensionIdentifier} *)`)

export const functionRelevantElements = () => {
  return document.querySelectorAll(`:not(#${extensionIdentifier}):not(#${extensionIdentifier} *)`)
}

export function getDominantBackgroundColor() {
  const elements = document.querySelectorAll('*');
  const colorCount = {};

  elements.forEach(element => {
    const bgColor = getComputedStyle(element).backgroundColor;
    if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      if (colorCount[bgColor]) {
        colorCount[bgColor]++;
      } else {
        colorCount[bgColor] = 1;
      }
    }
  });

  let dominantColor = null;
  let maxCount = 0;

  for (const color in colorCount) {
    if (colorCount[color] > maxCount) {
      maxCount = colorCount[color];
      dominantColor = color;
    }
  }

  return dominantColor;
}

export function getDominantBorderRadius() {
  const elements = document.querySelectorAll('*');
  const borderRadiusCount = {};

  elements.forEach(element => {
    const borderRadius = getComputedStyle(element).borderRadius;
    if (borderRadius && borderRadius !== '0px') {
      if (borderRadiusCount[borderRadius]) {
        borderRadiusCount[borderRadius]++;
      } else {
        borderRadiusCount[borderRadius] = 1;
      }
    }
  });

  let dominantBorderRadius = null;
  let maxCount = 0;

  for (const radius in borderRadiusCount) {
    if (borderRadiusCount[radius] > maxCount) {
      maxCount = borderRadiusCount[radius];
      dominantBorderRadius = radius;
    }
  }

  return dominantBorderRadius;
}

export function getDominantFontFace() {
  const elements = document.querySelectorAll('*');
  const fontFaceCount = {};

  elements.forEach(element => {
    const fontFace = getComputedStyle(element).fontFamily;
    if (fontFace) {
      if (fontFaceCount[fontFace]) {
        fontFaceCount[fontFace]++;
      } else {
        fontFaceCount[fontFace] = 1;
      }
    }
  });

  let dominantFontFace = null;
  let maxCount = 0;

  for (const font in fontFaceCount) {
    if (fontFaceCount[font] > maxCount) {
      maxCount = fontFaceCount[font];
      dominantFontFace = font;
    }
  }

  return dominantFontFace;
}

export function getDominantBorderColor() {
  const elements = document.querySelectorAll('*');
  const borderColorCount = {};

  elements.forEach(element => {
    const borderColor = getComputedStyle(element).borderColor;
    if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)' && borderColor !== 'transparent') {
      if (borderColorCount[borderColor]) {
        borderColorCount[borderColor]++;
      } else {
        borderColorCount[borderColor] = 1;
      }
    }
  });

  let dominantBorderColor = null;
  let maxCount = 0;

  for (const color in borderColorCount) {
    if (borderColorCount[color] > maxCount) {
      maxCount = borderColorCount[color];
      dominantBorderColor = color;
    }
  }

  return dominantBorderColor;
}

export function getGenericFactor(property, elements, condition) {
  const counts = {};

  elements.forEach(element => {
    const propertyValue = getComputedStyle(element)[property];
    if (propertyValue && condition(propertyValue)) {
      if (counts[propertyValue]) {
        counts[propertyValue]++;
      } else {
        counts[propertyValue] = 1;
      }
    }
  });

  let dominantValue = null;
  let maxCount = 0;

  console.log(counts, property);

  for (const count in counts) {
    if (counts[count] > maxCount) {
      maxCount = counts[count];
      dominantValue = count;
    }
  }

  return dominantValue;
}
