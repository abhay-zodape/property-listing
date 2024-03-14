import React from "react";
import styles from "./AddListing.module.scss";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import { useForm } from "react-hook-form";
import { IAddListingForm } from "./AddListing.type";
import Input from "../../components/Input/Input";
import { State, City } from "country-state-city";
import Select from "../../components/Select/Select";
import { PROPERTY_STATUS_OPTIONS, PROPERTY_TYPE_OPTIONS } from "./constants";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";

const AddListing = () => {
  const { register, handleSubmit, watch } = useForm<IAddListingForm>({
    defaultValues: {
      propertyTitle: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
      price: "",
      propertyStatus: "",
      propertyType: "",
      description: "",
      mainPicture: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const states = State.getStatesOfCountry("IN")?.map((state) => ({
    label: state?.name,
    value: state?.isoCode,
  }));

  const cities = watch("state")
    ? City.getCitiesOfState("IN", watch("state"))?.map((city) => ({
        label: city?.name,
        value: city?.name,
      }))
    : [];

  const handleAddListing = (values: IAddListingForm) => {
    console.log(values);
  };

  return (
    <WithHeader>
      <div className={styles.addListingWrapper}>
        <div className={styles.addListingMain}>
          <header className={styles.header}>
            <img
              className={styles.infoIcon}
              src="/assets/images/info-icon.svg"
              alt="info"
            />
            General Information
          </header>
          <main>
            <form
              className={styles.addListingForm}
              onSubmit={handleSubmit(handleAddListing)}
            >
              <div className={styles.row}>
                <div className={styles.input}>
                  <Input
                    label="Property Title"
                    placeholder="Property Title"
                    {...register("propertyTitle")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label="Address"
                    placeholder="Address"
                    {...register("address")}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Select
                    label="State"
                    options={states}
                    placeholder="Ex. Madhya Pradesh"
                    {...register("state")}
                  />
                </div>
                <div className={styles.input}>
                  <Select
                    label="City"
                    options={cities}
                    placeholder="Ex. Indore"
                    {...register("city")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label="Pincode"
                    placeholder="Ex. 452010"
                    {...register("pincode")}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Select
                    label="Property Type"
                    options={PROPERTY_TYPE_OPTIONS}
                    placeholder="Property Type"
                    {...register("propertyType")}
                  />
                </div>
                <div className={styles.input}>
                  <Select
                    label="Property Status"
                    options={PROPERTY_STATUS_OPTIONS}
                    placeholder="Property Status"
                    {...register("propertyStatus")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label="Price"
                    placeholder="Ex. 1000"
                    {...register("price")}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Textarea label="Description" {...register("description")} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    label="Main picture"
                    className={[styles.picture, styles.main].join(" ")}
                    {...register("mainPicture")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    className={styles.picture}
                    label="Picture01"
                    {...register("picture1")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    className={styles.picture}
                    label="Picture02"
                    {...register("picture2")}
                  />
                </div>
              </div>
              <div className={styles.submitButton}>
                <Button type="submit">List Property</Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </WithHeader>
  );
};

export default AddListing;
