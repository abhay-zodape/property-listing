import React from "react";
import styles from "./ListingCard.module.scss";
import { IListingCardProps } from "./ListingCard.type";

const ListingCard = ({ data }: IListingCardProps) => {
  return (
    <div className={styles.listingCard}>
      <div className={styles.image}>
        <img src={data?.imgUrl} alt={data?.name} />
      </div>
      <div className={styles.details}>
        <h2>{data?.name}</h2>
        <div className={styles.priceDetails}>
          <p className={styles.startsFrom}>Starts From</p>
          <p className={styles.price}>Rs. {data?.price}</p>
        </div>
        <div className={styles.description}>
          <p>{data?.description}</p>
        </div>
        <div className={styles.sizeDetails}>
          <div className={styles.size}>{data?.beds} beds</div>
          <div className={styles.size}>{data?.baths} baths</div>
          <div className={styles.size}>{data?.sqft} sqft.</div>
        </div>
        <div className={styles.seeDetails}>
          <button className={styles.seeDetailsButton}>See Details</button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
