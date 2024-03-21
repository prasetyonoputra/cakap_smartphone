const login = async (username, password) => {
  try {
    const request = await fetch(
      'http://prasetyonoputra.cloud:8080/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    );

    const response = await request.json();
    if (request.ok) {
      console.warn(response.message);
    } else {
      console.error(response.message);
    }

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {login};
