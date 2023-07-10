const fetchAPI = (PAT, USER_ID, APP_ID, MODEL_ID, MODEL_VERSION_ID, IMAGE_URL) => {
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => result.outputs[0].data.regions[0].region_info.bounding_box)
    .catch(error => console.log('error', error));
};

export default fetchAPI;  