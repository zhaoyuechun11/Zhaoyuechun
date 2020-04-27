
//const downLoadUrl = "https://bongo.oss-cn-shanghai.aliyuncs.com/";
const LoadManager = (function () {

  function LoadManager() {

  }

  LoadManager.downLoadUrl = "http://res.bongogames.info:8585/bongo-test/",

  LoadManager.initConfigFile = function(successCallback){

    let fileConfig = 'config.json';
    LoadManager.downLoadFile(fileConfig, function (result) {
      if ( result.ret == 1 ) {
        let fileEntry = result.fileEntry
        fileEntry.file(function (fileEntry) {
          let reader = new FileReader();
          reader.onloadend = function () {
            if ( successCallback ) {
              //alert('text 1' + this.result);
              successCallback({ret: 1, data: this.result})
            }
          };
          reader.readAsText(fileEntry);
        })
      }
      else
      {
        LoadManager.resolveLocalFile(fileConfig,
          function( fileEntry ) {
            fileEntry.file(function (fileEntry) {
              let reader = new FileReader();
              reader.onloadend = function() {
                if ( successCallback ) {
                  //alert('text 2' + this.result);
                  successCallback({ret: 1, data: this.result})
                }
              };
              reader.readAsText(fileEntry);
            })
          },
          function (error) {;
              if ( successCallback )
                successCallback({ret: 0, data: error.code})
          }
        );
      }
    })
  }

  LoadManager.downLoadGame = function(fileURL, successCallback, progressCallback )
  {
      LoadManager.resolveLocalFile(fileURL, function (fileEntry) {
            if (successCallback)
            {
                successCallback({ret:1, url: fileEntry.toURL()});
            }
          }, function (erro) {

            //alert ('down load file ' + fileURL );
            LoadManager.downLoadFile(fileURL + '.zip', function (result) {
              //alert('down load finish ' + result.ret)
              if (result.ret > 0) {
                 successCallback({ret:1, url: result.fileEntry.toURL()})
              } else {
                 successCallback({ret:0, url: null})
              }

            }, function (progress) {
                if (progressCallback)
                {
                  progressCallback(progress);
                }
            })
        });
  }

  //检查本地文件是否存在
  LoadManager.resolveLocalFile = function (fileURL, successCallback, errorCallback ){
      let dataRoot = cordova.file.applicationStorageDirectory;
      window.resolveLocalFileSystemURL(dataRoot + fileURL, successCallback, errorCallback);
  }

  LoadManager.readFile = function (fileURL, successCallback){
    let reader = new FileReader();
    reader.onloadend = function() {
      //alert('read loaded ');
      //alert(fileURL + ": "  + this.result);
      if ( successCallback )
      {
        successCallback(this.result);
      }
    };

    reader.onprogress = function(precessEvent){
      console.log('processEvent ' + processEvent.loaded );
    }
    console.log('read as text ....')
    //alert('read as text .. ' + fileURL);
    reader.readAsText(fileURL);
  }

  LoadManager.downLoadFile = function (fileURL, successCallback, progressCallback) {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

      var pathDir = "Android/data/com.dotjoy.bongo";
      fs.root.getDirectory(pathDir, {create: true, exclusive: false},
        function (fileEntry) {
          let pos = fileURL.lastIndexOf('/')
          let fileName = '';
          let filePath = '';

          // find the file name and path
          if ( pos > 0 ) {
            fileName = fileURL.substr(pos + 1);
            filePath = fileURL.substr(0, pos);
          }
          else
          {
            fileName = fileURL;
          }

          let isZip = ( fileName.indexOf('.zip') >= 0 );

          let fileTransfer = new FileTransfer();
          //alert("down load url  "  + LoadManager.downLoadUrl );
          let uri = encodeURI(LoadManager.downLoadUrl + fileURL);
          let tempURL = fileEntry.toURL() + "down/" + fileName;
          let targetURL = fileEntry.toURL() + filePath;
          //alert('file ' + uri + ' ' + tempURL + ' ' + targetURL);
          fileTransfer.onprogress = function (progressEvent) {
            //console.log('load zip file process ' + progressEvent.lengthComputable);
            let progress = (progressEvent.loaded / progressEvent.total) * 100;
            if (progressCallback) {
              //console.log('load file process ' + progress);
              progressCallback(progress);
            }
          };
          fileTransfer.download(
            uri,
            tempURL,
            function (entry) {
              let source = entry.toURL();
              if ( isZip ) {
                zip.unzip(source, targetURL, function (msg) {
                  if (successCallback) {
                    successCallback({ret: 1, fileEntry: entry});
                  }
                }, function (progressEvent) {
                  //console.log('un zip file process ' + progressEvent.lengthComputable);
                  // let progress = (progressEvent.loaded / progressEvent.total) * 100;
                  // if (progressCallback) {
                  //   progressCallback(progress);
                  // }
                })
              }
              else
              {
                if (successCallback) {
                  entry.moveTo(fileEntry, fileName, function (targetEntry) {
                    //console.log('move file success ' + targetEntry.toURL());
                    successCallback({ret: 1, fileEntry: targetEntry})
                  },function (error) {
                    console.log('move file error ' + error.code);
                  })
                }
              }
            },
            function (error) {
                //alert('network connection not available , please check your net');
                if (successCallback){
                  successCallback({ret:0, fileEntry: null })
                }
            },
            true
          );

        },
        function (error) {
            alert('Persistent error ' + error);
        });
    });
  }

  return LoadManager;
}
());

export { LoadManager }
