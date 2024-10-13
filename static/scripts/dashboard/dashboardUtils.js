/**
 * DashboardUtils.js
 */

const ageGroups = [
  { key: "age_group_5_to_14", label: "5-14 years" },
  { key: "age_group_15_to_24", label: "15-24 years" },
  { key: "age_group_25_to_34", label: "25-34 years" },
  { key: "age_group_35_to_54", label: "35-54 years" },
  { key: "age_group_75_plus", label: "75+ years" },
];

export const getHighestMortalityPerAgeGroup = (data, year) => {
  // console.log(`Check output age: ${year}`);
  return data
    .filter(
      (country) =>
        country.name === "All" &&
        (year ? country.year === year : country.year === "All")
    )
    .map((country) =>
      ageGroups.map((group) => ({
        age: group.label,
        mortality: country[group.key],
      }))
    )
    .flat()
    .reduce(
      (highest, current) =>
        current.mortality > highest.mortality ? current : highest,
      { age: "", mortality: 0 }
    );
};

export const getHighestMortalityPerCountry = (data, year) => {
  // console.log(`Check output country: ${year}`);
  return data
    .filter(
      (country) =>
        country.name !== "All" &&
        (year ? country.year === year : country.year === "All")
    )
    .reduce(
      (highest, current) =>
        current.total_mortality > highest.total_mortality ? current : highest,
      { name: "", total_mortality: 0 }
    );
};

export const getHighestMortalityPerYear = (data, year) => {
  // console.log(`Check output yeare: ${year}`);
  return data
    .filter(
      (country) =>
        country.name === "All" &&
        (year ? country.year === year : country.year === "All")
    )
    .reduce(
      (highest, current) =>
        current.total_mortality > highest.total_mortality ? current : highest,
      { year: "", total_mortality: 0 }
    );
};

export const getHighestMortalityPerSex = (data, year) => {
  // console.log(`Check output sex: ${year}`);
  const mortalityCountMale = data
    .filter(
      (country) =>
        country.name === "All" &&
        (year ? country.year === year : country.year === "All")
    )
    .reduce(
      (highest, current) => (current.male > highest.male ? current : highest),
      { male: 0 }
    );

  const mortalityCountFemale = data
    .filter(
      (country) =>
        country.name === "All" &&
        (year ? country.year === year : country.year === "All")
    )
    .reduce(
      (highest, current) =>
        current.female > highest.female ? current : highest,
      { female: 0 }
    );

  return mortalityCountMale.male > mortalityCountFemale.female
    ? { sex: "Males", mortality: mortalityCountMale.male }
    : { sex: "Females", mortality: mortalityCountFemale.female };
};
