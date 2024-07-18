import { useState } from "react";

import styles from "./Calculator.module.css";

type FormDataProps = {
  name: string;
  ageInYears: number | null;
};

export default function Calculator(): JSX.Element {
  const [formData, setFormData] = useState<FormDataProps>({ name: "", ageInYears: null });
  const [result, setResult] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [ageError, setAgeError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let isName: boolean = true;
    if (name == "name") {
      isName = /^[A-Za-z\s]*$/.test(value);
    }
    if (isName) {
      setFormData((prev) => {
        return { ...prev, [name]: value === null ? "" : value };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const formName: string = formData.get("name") as string;
    const formAgeInYearsStr: string | null = formData.get("ageInYears") as string | null;
    const formAgeInYears: number | null = formAgeInYearsStr === null || formAgeInYearsStr.trim() == "" ? null : Number(formAgeInYearsStr);
    const formAgeInDays: number | null = formAgeInYears === null ? null : formAgeInYears * 365;
    const formattedAgeInDays = formAgeInDays !== null ? new Intl.NumberFormat().format(formAgeInDays) : null;
    if (formName.trim() === "" || formAgeInYears === null) {
      if (formName === "") {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (formAgeInYears === null) {
        setAgeError(true);
      } else {
        setAgeError(false);
      }
      setResult("");
    } else {
      setNameError(false);
      setAgeError(false);
      setResult(`${formName} is ${formattedAgeInDays} days old!`);
    }
  };

  return (
    <>
      <form action="submit" className={`${styles["calculator-form"]}`} onSubmit={handleSubmit}>
        <div className={`${styles["calculator-form__field"]} ${styles["calculator-form__field__name"]}`}>
          <label htmlFor="input__name" className={`${styles.label} ${styles.label__name}`} title="">
            Name
          </label>
          <input
            id="input__name"
            name="name"
            type="text"
            className={`${styles.input} ${styles.input__name}`}
            placeholder="Enter a name"
            onChange={handleChange}
            value={formData.name}
          />
          {nameError ? <small className={styles.error}>Please enter a name</small> : <small className={styles["no-error"]}>-</small>}
        </div>
        <div className={`${styles["calculator-form__field"]} ${styles["calculator-form__field__age-in-years"]}`}>
          <label htmlFor="input__age-in-years" className="label label__age-in-years">
            Age in years
          </label>
          <input
            id="input__age-in-years"
            name="ageInYears"
            type="number"
            className={`${styles["input"]} ${styles["input__age-in-years"]}`}
            placeholder="Enter an age in years"
            onChange={handleChange}
            value={formData.ageInYears !== null ? String(formData.ageInYears) : ""}
          />
          {ageError ? <small className={styles.error}>Please enter an age</small> : <small className={styles["no-error"]}>-</small>}
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <div className={styles.results}>
          <p>{result}</p>
        </div>
      </form>
    </>
  );
}
