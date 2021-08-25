var admin = require("firebase-admin");
var bucket = undefined;

module.exports = {
  init(providerOptions) {
    var debugLogs = providerOptions.debugLogs || true;

    // initialize firebase provider
    if (!bucket) {
      //debug logs
      if (debugLogs) {
        console.log(
          "initializing firebase storage provider...................."
        );
      }
      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert(providerOptions.serviceAccount),
          storageBucket: providerOptions.bucket,
        });
      }
      bucket = admin.storage().bucket();
    }

    return {
      upload(file) {
        // triggered when you attempt a upload operation in the media library

        //debug logs
        if (debugLogs) {
          console.log("uploadiingg....................");
        }

        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/` : "";
          const filename = `${path}${file.hash}${file.ext}`;
          const buff = Buffer.from(file.buffer, "binary");
          const remoteFile = bucket.file(filename);
          remoteFile.save(
            buff,
            {
              resumable: false,
              contentType: file.mime,
              public: true,
            },
            (err) => {
              if (err) {
                //debug logs
                if (debugLogs) {
                  console.log(
                    "image could not be uploaded...................."
                  );
                  console.log(`error: ${err}`);
                }

                reject(err);
              }

              //using the url norms given by firebase storage, instead of getting them from getUrl() function
              var generatedUrl = `https://storage.googleapis.com/${providerOptions.bucket}/${filename}`;
              file.url = generatedUrl;
              resolve();

              //debug logs
              if (debugLogs) {
                console.log("image uploaded....................");
                console.log(`with url : ${generatedUrl}`);
              }
            }
          );
        });
      },
      delete(file) {
        // triggered when you attempt a delete operation in the media library

        //debug logs
        if (debugLogs) {
          console.log(`Deletting ${file.name}....................`);
        }

        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/` : "";
          const filename = `${path}${file.hash}${file.ext}`;
          const remoteFile = bucket.file(filename);
          remoteFile.delete((err, _) => {
            if (err) {
              if (err.code === 404) {
                //debug logs
                if (debugLogs) {
                  console.log(
                    "image that is being deleting is not available in storage bucket"
                  );
                  console.log(
                    "ignoring the above fact and removing the file from strapi..."
                  );
                }
                resolve();
              }

              //debug logs
              if (debugLogs) {
                if (!err.code === 404) {
                  err.errors.map((_err) => console.log(_err.message));
                }
              }
              return reject(err);
            }
            resolve();

            //debug logs
            if (debugLogs) {
              console.log("deleted....................");
            }
          });
        });
      },
    };
  },
};
