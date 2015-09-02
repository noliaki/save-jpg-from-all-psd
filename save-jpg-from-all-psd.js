;(function(){
  'use strict';

  var directory = Folder.selectDialog('フォルダを選べ'),
      jpegOpt  = new JPEGSaveOptions();

  jpegOpt.embedColorProfile = true;
  jpegOpt.quality           = 12;
  jpegOpt.formatOptions     = FormatOptions.PROGRESSIVE;
  jpegOpt.scans             = 3;
  jpegOpt.matte             = MatteType.NONE;

  seekPSD(directory);

  function seekPSD(folder){
    var files = folder.getFiles(),
        fileName = '';

    for (var i = 0, len = files.length; i < len; i++) {
      if( files[i] instanceof Folder ){
        seekPSD(files[i]);
      } else {
        fileName = files[i].fsName;
        if( /(\.psd)$/.test(fileName) ){
          exportJPG(files[i]);
        }
      }
    }
  }

  function exportJPG (psdFile) {
    var confirmFlg,
        fileObj;
    open( File(psdFile.fsName) );
    confirmFlg = confirm('[' + psdFile.fsName + ']のJPGだすよ？？');

    if( confirmFlg ){
      fileObj  = new File( psdFile.fsName.replace(/(\.psd)$/, '.jpg')),
      activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);
      activeDocument.close();
    }
  }
})();