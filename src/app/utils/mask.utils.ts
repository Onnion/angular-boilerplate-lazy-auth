export const cleanUp = (value: string) => {
  return value.toString().replace(/\D/g, "");
};

export const maskFormat = (value: any, maskDefault: string): string => {
  let valor = cleanUp(value);

  const pad = cleanUp(maskDefault).replace(/9/g, "_");
  const valorMask = valor + pad.substring(0, pad.length - valor.length);

  let valorMaskPos = 0;

  valor = "";

  for (let i = 0; i < maskDefault.length; i++) {
    valor += isNaN(parseInt(maskDefault.charAt(i), 10))
      ? maskDefault.charAt(i)
      : valorMask[valorMaskPos++];
  }

  if (valor.indexOf("_") > -1) {
    valor = valor.substr(0, valor.indexOf("_"));
  }

  value = valor;

  return value;
};
