import React from "react";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import styles from "./Listing.module.scss";
import { LISTING_CARD_DETAILS } from "./constants";
import ListingCard from "../../components/ListingCard/ListingCard";
import Input from "../../components/Input/Input";
import Filter from "./Filter/Filter";

const Listing = () => {
  return (
    <WithHeader>
      <div className={styles.listingPage}>
        <div className={styles.listingWrapper}>
          <div className={styles.listing}>
            <header className={styles.header}>
              <h1>Listing</h1>
              <div className={styles.search}>
                <Input
                  placeholder="Search by area"
                  className={styles.searchInput}
                />
              </div>
            </header>
            <main className={styles.allListing}>
              {LISTING_CARD_DETAILS?.map((listing, index) => (
                <ListingCard data={listing} key={index} />
              ))}
            </main>
          </div>
          <div className={styles.actionsWrapper}>
            <Filter />
          </div>
        </div>
      </div>
    </WithHeader>
  );
};

export default Listing;
