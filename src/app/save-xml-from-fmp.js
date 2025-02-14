const fetchXML = async (dataToken) => {
  const scriptName = "Save-as-XML-PSOS";

  const endPointURL = `${process.env.FMSERVER}${process.env.BASE_ENDPOINT}${process.env.LAYOUT}/script/${scriptName}`;

  // assign custom headers into formData
  const headers = {
    Authorization: "Bearer " + dataToken,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(endPointURL, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    const res = data.response.data;

    return data.response.data;
  } catch (e) {
    console.error("Exception: ", e);
  }
};

export { fetchXML };
