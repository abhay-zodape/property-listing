export interface IFilterForm {
  propertyType: string[];
  price: {
    min: string;
    max: string;
  };
  location: string[];
  distance: string;
}

export type IFilterChangeType = "location" | "propertyType";

export interface IFilterProps {
  handleApply: (values: IFilterForm) => void;
  handleReset: () => void;
}
