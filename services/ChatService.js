const getListChat = async (token, usernameReceiver) => {
  try {
    const request = await fetch(
      'http://prasetyonoputra.cloud:8080/api/chat?usernameReceiver=' +
        usernameReceiver,
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

export default {getListChat};
