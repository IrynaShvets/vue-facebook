// import axios from "axios";

// const BASE_URL = "http://localhost:80/api";


// export const getListFriends = (authId, token) => {
//     return new Promise((resolve, reject) => {
      
//       axios
//         .get(`${BASE_URL}/users/${authId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           if (!response) {
//             reject(response);
//           }
    
//           resolve(response.data.data.friends);
         
//         })
//         .catch((error) => {
//           reject(error.response);
//         });
//     });
//   }
