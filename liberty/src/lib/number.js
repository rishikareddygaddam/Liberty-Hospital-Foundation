export const numberChange = (e, setFieldValue, name) => {
  e.preventDefault();
  const { value } = e.target;
  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  if (!value || regex.test(value.toString())) {
    setFieldValue(name, value);
  }
};
