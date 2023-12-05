// to get auth code 

// var client_id = "7bb900aae1c544518c151201106d7bba";
//         var client_secret = "efd828bfe750468d826269be822295ce";

//         const authOptions = {
//             method: "post",
//             url: "https://accounts.spotify.com/api/token",
//             headers: {
//                 Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             data: new URLSearchParams({
//                 grant_type: "client_credentials",
//             }),
//         };

//         axios(authOptions)
//             .then((response) => {
//                 // Handle the successful response here
//                 const token = response.data;
//                 console.log("Access Token:", token);
//             })
//             .catch((error) => {
//                 // Handle errors here
//                 console.error("Error:", error.response.data);
//             });

