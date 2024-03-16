import React from "react";
import styles from "./Filter.module.scss";
import { PROPERTY_TYPE_OPTIONS } from "../../AddListing/constants";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { IFilterForm } from "./Filter.type";

const Filter = () => {
  const { watch, setValue, handleSubmit, register, reset } =
    useForm<IFilterForm>({
      defaultValues: {
        propertyType: [],
        price: {
          min: "",
          max: "",
        },
        area: "",
      },
    });

  const onSubmit = (values: IFilterForm) => {
    console.log(values);
  };

  const handlePropertyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event?.currentTarget;

    if (checked) {
      setValue("propertyType", [...watch("propertyType"), value]);
    } else
      setValue(
        "propertyType",
        watch("propertyType")?.filter((id) => id !== value)
      );
  };

  const handleClear = () => {
    reset();
  };

  return (
    <div className={styles.filterWrapper}>
      <header>
        <h3>Filter By</h3>
      </header>
      <main>
        <form className={styles.filterForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={styles.optionWrapper}>
              <h4>Property Type</h4>
              <div className={styles.options}>
                {PROPERTY_TYPE_OPTIONS.map(({ value, label }, index) => {
                  return (
                    <div className={styles.input} key={`${value}-${index}`}>
                      <Input
                        type="checkbox"
                        value={value}
                        checked={watch("propertyType").includes(value)}
                        onChange={handlePropertyTypeChange}
                      />
                      <label>{label}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.optionWrapper}>
              <h4>Price (Rs.)</h4>
              <div className={styles.priceRange}>
                <Input isNumber placeholder="min" {...register("price.min")} />{" "}
                <span>-</span>{" "}
                <Input isNumber placeholder="max" {...register("price.min")} />
              </div>
            </div>
            <div className={styles.optionWrapper}>
              <h4>Area (sqft.)</h4>
              <div className={styles.options}>
                <Input
                  isNumber
                  placeholder="Enter area in sqft"
                  {...register("area")}
                />
              </div>
            </div>
          </div>
          <div className={styles.actionWrapper}>
            <Button className={styles.button} type="submit">
              Apply
            </Button>
            <Button className={styles.button} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Filter;
