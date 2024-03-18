import React from "react";
import styles from "./Filter.module.scss";
import {
  LOCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "../../AddListing/constants";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { IFilterForm, IFilterChangeType, IFilterProps } from "./Filter.type";

const Filter = ({ handleApply, handleReset }: IFilterProps) => {
  const { watch, setValue, handleSubmit, register, reset } =
    useForm<IFilterForm>({
      defaultValues: {
        propertyType: [],
        price: {
          min: "",
          max: "",
        },
        location: [],
        distance: "",
      },
    });

  const onSubmit = (values: IFilterForm) => {
    handleApply(values);
  };

  const handleCheckboxChange = (
    event: React.FormEvent<HTMLInputElement>,
    name: IFilterChangeType
  ) => {
    const { checked, value } = event?.currentTarget;

    if (checked) {
      setValue(name, [...watch(name), value]);
    } else
      setValue(
        name,
        watch(name)?.filter((id) => id !== value)
      );
  };

  const handleClear = () => {
    reset();
    handleReset();
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
                        onChange={(event) =>
                          handleCheckboxChange(event, "propertyType")
                        }
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
                <Input isNumber placeholder="max" {...register("price.max")} />
              </div>
            </div>
            <div className={styles.optionWrapper}>
              <h4>Distance (km)</h4>
              <div className={styles.options}>
                <Input
                  isNumber
                  placeholder="Enter distance from MIT"
                  {...register("distance")}
                />
              </div>
            </div>
            <div className={styles.optionWrapper}>
              <h4>Location </h4>
              <div className={styles.priceRange}>
                {LOCATION_OPTIONS?.map(({ value, label }, index) => {
                  return (
                    <div className={styles.input} key={`${label}-${index}`}>
                      <Input
                        value={value}
                        type="checkbox"
                        checked={watch("location")?.includes(value)}
                        onChange={(event) =>
                          handleCheckboxChange(event, "location")
                        }
                      />
                      <label>{label}</label>
                    </div>
                  );
                })}
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
