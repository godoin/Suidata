/**
 * Fetch Api Utils
 */

export async function fetchJSONData(jsonUrl) {
  if (!jsonUrl) {
    console.error("Error there is no url found...");
    return null;
  }

  try {
    const res = await fetch(jsonUrl);

    if (!res.ok) {
      console.error(`HTTP Response Status: ${res.message}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
