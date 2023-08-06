export const personnamehandler = (
  firstName: string,
  lastName: string,
  country: string
) => {
  if (country == "mn")
    return lastName[0].toUpperCase() + ". " + capitalizeFirstLetter(firstName);
  return (
    capitalizeFirstLetter(firstName) + " " + capitalizeFirstLetter(lastName)
  );
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
