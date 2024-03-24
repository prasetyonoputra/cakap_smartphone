const getUserProfile = async token => {
  try {
    const request = await fetch('http://192.168.100.249:8080/api/user/detail', {
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
