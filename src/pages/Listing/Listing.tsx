import React, { useEffect, useState } from "react";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import styles from "./Listing.module.scss";
import ListingCard from "../../components/ListingCard/ListingCard";
import Filter from "./Filter/Filter";
import { fireStore } from "../../firebase/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IListingData } from "../../components/ListingCard/ListingCard.type";
import Loader from "../../components/Loader/Loader";
import { IFilterForm } from "./Filter/Filter.type";
import { toast } from "react-toastify";

const Listing = () => {
  const [propertyListings, setPropertyListings] = useState<IListingData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPropertyListings = async () => {
    setLoading(true);
    try {
      const listingsRef = collection(fireStore, "propertyListings");
      const snapshot = await getDocs(listingsRef);
      const listingsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IListingData[];
      setPropertyListings(listingsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching property listings");
    }
  };

  useEffect(() => {
    fetchPropertyListings();
  }, []);

  const applyFilters = async (filters: IFilterForm) => {
    setLoading(true);
    try {
      let filteredQuery: any = collection(fireStore, "propertyListings");

      if (filters.propertyType && filters.propertyType.length > 0) {
        filteredQuery = query(
          filteredQuery,
          where("propertyType", "in", filters.propertyType)
        );
      }

      // Apply price filter
      if (filters.price && filters.price.min && filters.price.max) {
        filteredQuery = query(
          filteredQuery,
          where("price", ">=", Number(filters.price.min))
        );
        filteredQuery = query(
          filteredQuery,
          where("price", "<=", Number(filters.price.max))
        );
      }

      // Apply location filter
      if (filters.location && filters.location.length > 0) {
        filteredQuery = query(
          filteredQuery,
          where("location", "in", filters.location)
        );
      }
      // Execute the query
      const snapshot = await getDocs(filteredQuery);

      // Process the results
      let listingsData = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) as IListingData[];
      if (filters?.distance) {
        listingsData = listingsData?.filter(
          (list) => list?.distance <= Number(filters?.distance)
        );
      }
      setPropertyListings(listingsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error applying filters");
    }
  };

  return (
    <WithHeader>
      <div className={styles.listingPage}>
        <div className={styles.listingWrapper}>
          <div className={styles.listing}>
            <header className={styles.header}>
              <h1>Listing</h1>
            </header>
            <main className={styles.allListing}>
              {propertyListings?.length > 0 ? (
                propertyListings.map((listing: IListingData) => (
                  <ListingCard data={listing} key={listing.id} />
                ))
              ) : (
                <div className={styles.noDataFound}>
                  <img src="/assets/images/no-data.svg" alt="no-data" />
                </div>
              )}
            </main>
          </div>
          <div className={styles.actionsWrapper}>
            <Filter
              handleApply={applyFilters}
              handleReset={fetchPropertyListings}
            />
          </div>
        </div>
      </div>
      <Loader show={loading} />
    </WithHeader>
  );
};

export default Listing;
