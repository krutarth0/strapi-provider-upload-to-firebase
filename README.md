# strapi-provider-upload-to-firebase

This is a strapi plugin for uploading assets to firebase, compatible with strapi 3.5.4
I took this repo [strapi-provider-upload-firebase](https://github.com/bentrynning/strapi-provider-upload-firebase)  by  [Bent Rynning](https://github.com/bentrynning) 👋 and modified it 🤟. (I know... but anyways).

## installation

```npm i strapi-provider-upload-to-firebase```


## Firebase credentials

- Create a firebase project ( if you couldn't somehow, [here](https://firebase.google.com/docs/web/setup)  follow step 1 ),
- Then in the project dashboard, go to the project settings ⚙️ -> service accounts -> click on generate new private key.
- This will download a .json file which we'll use to initialize our firebase client. 
> save this file somewhere safe

## Strapi plugin

After installing `strapi-provider-upload-to-firebase` we need to enable this plugin within strapi. For that, create or edit the file at `./config/plugins.js`
```
var credFile = require("<path/to/serviceAcountFileFromFirebase.json>");

module.exports = () => ({
    upload: {
        provider: 'to-firebase',
        providerOptions: {
            serviceAccount: credFile ,
            bucket: "<BUCKET_NAME>.appspot.com",
            debugLogs: true
        },
    },
}); 

```
- credFile : `Parsed json file that we downloaded from firebase`
- upload : `The object we export in order to use our media upload plugin in strapi`
  - provider :`plugin provider name`
  - providerOptions:`data that our module use to connect to your firebase app and upload assets`
    - serviceAccount :`parsed serviceAccount.json file`
    - bucket:`storage bucket name of firebase project`
    - debugLogs :`if you want to log out events while uploading or deleting`


Thats it! 😉
 more info about upload plugins in strapi docs [here](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#enabling-the-provider). 