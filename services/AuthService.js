const login = async (username, password) => {
  try {
    const request = await fetch(
      'http://192.168.100.249:8080/api/auth/login',
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

export default {login};
