# strapi-provider-upload-to-firebase
 strapi plugin for  uploading assets to firebase


```
module.exports = () => ({
    upload: {
      provider: 'to-firebase',
      providerOptions: {
        serviceAccount:serviceAccountFile,
        bucket:"notes-4c6bc.appspot.com",
        debugLogs:true
      },
    },
  });
  
```


