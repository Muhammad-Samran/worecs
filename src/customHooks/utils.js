export const REGEX = /^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]$/g;

export const ValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
};
