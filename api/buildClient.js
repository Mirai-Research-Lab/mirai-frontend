import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    console.log("server");
    return axios.create({
<<<<<<< HEAD
      baseURL: "http://localhost:3001/",
=======
      baseURL: "https://mirai-backend-kappa.vercel.app/",
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
      headers: req.headers,
      withCredentials: true,
    });
  } else {
    // We must be on the browser
    console.log("Client");
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
