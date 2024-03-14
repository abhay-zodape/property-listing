import React from "react";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import styles from "./Listing.module.scss";
import { LISTING_CARD_DETAILS } from "./constants";
import ListingCard from "../../components/ListingCard/ListingCard";

const Listing = () => {
  return (
    <WithHeader>
      <div className={styles.listingPage}>
        <div className={styles.listingWrapper}>
          <div className={styles.listing}>
            <header>
              <h1>Listing</h1>
            </header>
            <main className={styles.allListing}>
              {LISTING_CARD_DETAILS?.map((listing, index) => (
                <ListingCard data={listing} key={index} />
              ))}
            </main>
          </div>
          <div className={styles.contactWrapper}>Contact</div>
        </div>
      </div>
    </WithHeader>
  );
};

export default Listing;
