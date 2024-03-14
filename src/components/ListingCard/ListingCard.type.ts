export interface IListingCardProps {
  data: IListingCard;
}

export interface IListingCard {
  id: string;
  name: string;
  price: string;
  description: string;
  imgUrl: string;
  beds: number;
  baths: number;
  sqft: number;
}
