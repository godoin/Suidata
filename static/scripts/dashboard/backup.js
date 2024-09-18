const ageGroupOne = data
  .filter((country) => country.name === "All" && country.year === "All")
  .reduce(
    (highest, current) =>
      current.age_group_5_to_14 > highest.mortality
        ? { age: "5-14 years", mortality: current.age_group_5_to_14 }
        : highest,
    { age: "", mortality: 0 }
  );

const ageGroupTwo = data
  .filter((country) => country.name === "All" && country.year === "All")
  .reduce(
    (highest, current) =>
      current.age_group_15_to_24 > highest.mortality
        ? { age: "15-24 years", mortality: current.age_group_15_to_24 }
        : highest,
    { age: "", mortality: 0 }
  );

const ageGroupThree = data
  .filter((country) => country.name === "All" && country.year === "All")
  .reduce(
    (highest, current) =>
      current.age_group_25_to_34 > highest.mortality
        ? { age: "25-34 years", mortality: current.age_group_25_to_34 }
        : highest,
    { age: "", mortality: 0 }
  );
const ageGroupFour = data
  .filter((country) => country.name === "All" && country.year === "All")
  .reduce(
    (highest, current) =>
      current.age_group_35_to_54 > highest.mortality
        ? { age: "35-54 years", mortality: current.age_group_35_to_54 }
        : highest,
    { age: "", mortality: 0 }
  );

const ageGroupFive = data
  .filter((country) => country.name === "All" && country.year === "All")
  .reduce(
    (highest, current) =>
      current.age_group_55_to_74 > highest.mortality
        ? { age: "55-74 years", mortality: current.age_group_55_to_74 }
        : highest,
    { age: "", mortality: 0 }
  );

const ageGroupSix = data
  .filter((country) => country.name === "All" && country.year === "All")
  .reduce(
    (highest, current) =>
      current.age_group_75_plus > highest.mortality
        ? { age: "75+ years", mortality: current.age_group_75_plus }
        : highest,
    { age: "", mortality: 0 }
  );

const highestMortalityPerAgeGroup = [
  ageGroupOne,
  ageGroupTwo,
  ageGroupThree,
  ageGroupFour,
  ageGroupFive,
  ageGroupSix,
].reduce(
  (highest, current) =>
    current.mortality > highest.mortality
      ? { age: current.age, mortality: current.mortality }
      : highest,
  { age: "", mortality: 0 }
);

