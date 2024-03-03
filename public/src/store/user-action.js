import { userAction } from "./user";

export const userUpdateLocation = () => {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const url = "http://localhost:3030/gemini/api/updatelocation";

          fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location: {
                lat: latitude,
                long: longitude,
              },
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Update Location Failed");
              }

              return response.json();
            })
            .then((data) => {
              dispatch(userAction.setLocation({ location: data.location }));
              localStorage.setItem("location", data.location);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        (error) => {
          console.error("Error getting messsage", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
  };
};
