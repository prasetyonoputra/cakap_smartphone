const getListContact = async token => {
  try {
    const request = await fetch('http://prasetyonoputra.cloud:8080/api/contact', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();
    if (request.ok) {
      console.log(response.message);
    } else {
      console.error(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error(error);

    return null;
  }
};

const getDetailContact = async (token, username) => {
  try {
    const request = await fetch(
      `http://prasetyonoputra.cloud:8080/api/contact/detail?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const response = await request.json();
    if (request.ok) {
      console.log(response.message);
    } else {
      console.error(response.message);
      return null;
    }

    return response;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default {getListContact, getDetailContact};
