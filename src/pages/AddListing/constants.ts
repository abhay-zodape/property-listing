import * as yup from "yup";

export const PROPERTY_TYPE_OPTIONS = [
  { value: "Girls Pg", label: "Girls Pg" },
  { value: "Boys Pg", label: "Boys Pg" },
  { value: "1 RK", label: "1 RK" },
  { value: "1 BHK", label: "1 BHK" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
];

export const LOCATION_OPTIONS = [
  { label: "Kothrud", value: "Kothrud" },
  { label: "Warje", value: "Warje" },
];

export const addFormSchema = yup.object().shape({
  propertyTitle: yup.string().required(),
  address: yup.string().required(),
  location: yup.string().required(),
  price: yup.string().required(),
  distance: yup.string().required(),
  propertyType: yup.string().required(),
  description: yup.string().required(),
  mainPicture: yup.mixed().required(),
  picture1: yup.mixed().required(),
  picture2: yup.mixed().required(),
});
