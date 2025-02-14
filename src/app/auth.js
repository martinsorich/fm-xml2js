import btoa from "btoa";

// delete access token

const logoutAdminAPI = async (server, token) => {
  console.log("inside logoutAdminAPI server: ", server);
  console.log("inside logoutAdminAPI token: ", token);
  try {
    const response = await fetch(
      `${server}/fmi/admin/api/v2/user/auth/${token}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    return data.response;
  } catch (e) {
    console.error("logoutAdminAPI Error:", e);
  }
};

const logoutDataAPI = async (server, database, token) => {
  try {
    const response = await fetch(
      `${server}/fmi/data/vLatest/databases/${database}/sessions/${token}`,
      {
        method: "DELETE",
      }
    );
  } catch (e) {
    console.error("logoutDataAPI Error:", e.message);
  }
};

// Admin API authentication
const authAdminAPI = async (
  server,
  adminUsername,
  adminPassword,
  successCallBack,
  errorCallBack
) => {
  try {
    const response = await fetch(`${server}/fmi/admin/api/v2/user/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${adminUsername}:${adminPassword}`),
      },
    });

    const data = await response.json();
    return data.response.token;
  } catch (e) {
    console.error("authAdminAPI Error:", e.message);
  }
};

// Data API authentication
const authDataAPI = async (server, database, username, password) => {
  try {
    const url = `${server}/fmi/data/vLatest/databases/${database}/sessions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    });

    const data = await response.json();

    return data.response.token;
  } catch (e) {
    console.error("authDataAPI Error:", e.message);
  }
};

export { authAdminAPI, authDataAPI, logoutAdminAPI, logoutDataAPI };
