const getUserProfile = async token => {
  try {
    const request = await fetch('http://prasetyonoputra.cloud:8080/api/user/detail', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();
    if (request.ok) {
      console.log(`Login: ${response.user.firstName}`);
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

export default {getUserProfile};
