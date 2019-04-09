import { cleanUp } from "../../utils/mask.utils";

const invalidsCpfs = [
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999"
];

export const validCpf = (cpf: string): boolean => {
  if (cpf) {
    const value = cleanUp(cpf);
    const length = value.length;

    return length === 11 ? checkCpf(value) : false;
  }
};

const checkCpf = (strCPF: string): boolean => {
  let sum = 0;
  let over;

  if (invalidsCpfs.includes(strCPF)) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  }

  over = (sum * 10) % 11;

  if (over === 10 || over === 11) {
    over = 0;
  }
  if (over !== parseInt(strCPF.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  }

  over = (sum * 10) % 11;

  if (over === 10 || over === 11) {
    over = 0;
  }

  return over === parseInt(strCPF.substring(10, 11), 10);
};
