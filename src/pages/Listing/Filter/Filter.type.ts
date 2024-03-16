export interface IFilterForm {
  propertyType: string[];
  area: string;
  price: {
    min: string;
    max: string;
  };
}
