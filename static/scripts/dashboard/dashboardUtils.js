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

export const getHighestMortalityPerAgeGroup = (data) => {
  return data
    .filter((country) => country.name === "All" && country.year === "All")
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

export const getHighestMortalityPerYear = (data) => {
  return data
    .filter((country) => country.name === "All" && country.year !== "All")
    .reduce((highest, current) =>
      current.total_mortality > highest.total_mortality ? current : highest
    );
};

export const getHighestMortalityPerCountry = (data) => {
  return data
    .filter((country) => country.name !== "All" && country.year === "All")
    .reduce((highest, current) =>
      current.total_mortality > highest.total_mortality ? current : highest
    );
};

export const getHighestMortalityPerSex = (data) => {
  const mortalityCountMale = data
    .filter((country) => country.name === "All" && country.year === "All")
    .reduce((highest, current) =>
      current.male > highest.male ? current : highest
    );

  const mortalityCountFemale = data
    .filter((country) => country.name === "All" && country.year === "All")
    .reduce((highest, current) =>
      current.female > highest.female ? current : highest
    );

  return mortalityCountMale.male > mortalityCountFemale.female
    ? { sex: "Males", mortality: mortalityCountMale.male }
    : { sex: "Females", mortality: mortalityCountFemale.female };
};
