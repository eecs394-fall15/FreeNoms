if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2/",
    "headers": {
      "steroidsApiKey": "37b1f3705d4564280f825ffb654e3d5ba81d4fc9f49b91ce5473f037f86fe454",
      "steroidsAppId": 80252
    }
  },
  "resources": {
    "Event": {
      "schema": {
        "fields": {
          "Food": {
            "type": "string"
          },
          "Who": {
            "type": "string"
          },
          "Time": {
            "type": "string"
          },
          "Date": {
            "type": "string"
          },
          "Location": {
            "type": "string"
          },
          "Organization": {
            "type": "string"
          },
          "id": {
            "type": "string",
            "identity": true
          }
        },
        "identifier": "id"
      }
    }
  }
};