export interface IListingCardProps {
  data: IListingData;
}

export interface IListingData {
  id: string;
  propertyTitle: string;
  address: string;
  location: string;
  price: number;
  distance: number;
  propertyType: string;
  description: string;
  images: string[];
}
