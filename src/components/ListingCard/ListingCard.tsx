import React from "react";
import styles from "./ListingCard.module.scss";
import { IListingCardProps } from "./ListingCard.type";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ListingCard = ({ data }: IListingCardProps) => {
  return (
    <div className={styles.listingCard}>
      <div className={styles.image}>
        <Carousel infiniteLoop showThumbs={false} autoPlay>
          {data?.images?.map((imgUrl) => (
            <img key={imgUrl} src={imgUrl} alt={data?.propertyTitle} />
          ))}
        </Carousel>
      </div>
      <div className={styles.details}>
        <div className={styles.header}>
          <h2>{data?.propertyTitle}</h2>
          <p>Distance from MIT - {data?.distance} km</p>
        </div>
        <div className={styles.priceDetails}>
          <p className={styles.startsFrom}>Monthly Rent</p>
          <p className={styles.price}>Rs. {data?.price}</p>
        </div>
        <div className={styles.description}>
          <p>{data?.description}</p>
        </div>
        <div className={styles.description}>
          <h4>Address</h4>
          <p>
            {data?.address}, {data?.location}
          </p>
        </div>
        <div className={styles.seeDetails}>
          <button className={styles.seeDetailsButton}>
            {data?.propertyType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
