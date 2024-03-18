import React, { useState } from "react";
import styles from "./AddListing.module.scss";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import { useForm } from "react-hook-form";
import { IAddListingForm } from "./AddListing.type";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import {
  LOCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  addFormSchema,
} from "./constants";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { fireStore, storage } from "../../firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "react-toastify";

const AddListing = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IAddListingForm>({
    defaultValues: {
      propertyTitle: "",
      address: "",
      location: "",
      price: "",
      distance: "",
      propertyType: "",
      description: "",
      mainPicture: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(addFormSchema),
  });

  const listingsRef = collection(fireStore, "propertyListings");

  const handleAddListing = async (values: IAddListingForm) => {
    try {
      setLoading(true);
      const fileToDataURL = (file: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // Function to upload data URL to Firebase Storage
      const uploadDataURL = async (dataURL: any, refPath: any) => {
        const imageRef = ref(storage, refPath);
        await uploadString(imageRef, dataURL, "data_url");
        const url = await getDownloadURL(imageRef);
        return url;
      };

      // Convert files to data URLs and upload to Firebase Storage
      const mainPictureDataURL = await fileToDataURL(values?.mainPicture?.[0]);
      const mainPictureUrl = await uploadDataURL(
        mainPictureDataURL,
        values?.mainPicture?.[0].name
      );

      const picture1DataURL = await fileToDataURL(values?.picture1?.[0]);
      const picture1Url = await uploadDataURL(
        picture1DataURL,
        values?.picture1?.[0].name
      );

      const picture2DataURL = await fileToDataURL(values?.picture2?.[0]);
      const picture2Url = await uploadDataURL(
        picture2DataURL,
        values?.picture2?.[0].name
      );

      await addDoc(listingsRef, {
        propertyTitle: values.propertyTitle,
        address: values.address,
        location: values.location,
        price: Number(values.price),
        distance: Number(values.distance),
        propertyType: values.propertyType,
        description: values.description,
        images: [mainPictureUrl, picture1Url, picture2Url],
      });

      toast.success("Listing Added successfully");
      setLoading(false);
      reset();
    } catch (error) {
      setLoading(false);
      toast.error("Error adding property listing");
    }
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
                    error={errors.propertyTitle?.message}
                    showError
                  />
                </div>
                <div className={styles.input}>
                  <Select
                    label="Location"
                    options={LOCATION_OPTIONS}
                    placeholder="Ex. Kothrud"
                    {...register("location")}
                    error={errors.location?.message}
                    showError
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Input
                    label="Address"
                    placeholder="Address"
                    {...register("address")}
                    error={errors.address?.message}
                    showError
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label="Distance From MIT (In Km)"
                    placeholder="Distance"
                    isNumber
                    {...register("distance")}
                    error={errors.distance?.message}
                    showError
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
                    error={errors.propertyType?.message}
                    showError
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label="Price (In Rs.)"
                    placeholder="Ex. 1000"
                    isNumber
                    {...register("price")}
                    error={errors.price?.message}
                    showError
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Textarea
                    label="Description"
                    {...register("description")}
                    error={errors.description?.message}
                    showError
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    label="Main picture"
                    className={[styles.picture, styles.main].join(" ")}
                    showError
                    error={errors.mainPicture?.message as string}
                    {...register("mainPicture")}
                    // onChange={(event) => handleFileChange(event, "mainPicture")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    className={styles.picture}
                    label="Picture01"
                    showError
                    error={errors.picture1?.message as string}
                    {...register("picture1")}
                    // onChange={(event) => handleFileChange(event, "picture1")}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    className={styles.picture}
                    label="Picture02"
                    showError
                    error={errors?.picture2?.message as string}
                    {...register("picture2")}
                    // onChange={(event) => handleFileChange(event, "picture2")}
                  />
                </div>
              </div>
              <div className={styles.submitButton}>
                <Button disabled={loading} type="submit">
                  {loading ? "Loading ..." : "List Property"}
                </Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </WithHeader>
  );
};

export default AddListing;
