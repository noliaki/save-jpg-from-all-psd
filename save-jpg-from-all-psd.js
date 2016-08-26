;(function(){
  'use strict';

  alert('フォルダを選んでね！');

  var directory = Folder.selectDialog('PSDフォルダを選べ！'),
      jpegOpt  = new JPEGSaveOptions();

  jpegOpt.embedColorProfile = true;
  jpegOpt.quality           = 12;
  jpegOpt.formatOptions     = FormatOptions.PROGRESSIVE;
  jpegOpt.scans             = 3;
  jpegOpt.matte             = MatteType.NONE;

  if(!directory){
    return;
  }

  var psdDirName = directory.fsName;
  var jpgDir = new Folder(directory.fsName + '/../JPG/');

  if (!jpgDir.exists) {
    if (confirm(jpgDir.fsName + 'フォルダを作成します')) {
      if (jpgDir.create()) {
        alert( jpgDir.fsName + 'フォルダを作成しました' );
      } else {
        alert( jpgDir.fsName + 'フォルダを作成中にエラーになりました' );
        return;
      }
    } else {
      alert( '処理を中断しました' );
      return;
    }
  }

  seekPSD(directory);

  function seekPSD (folder) {
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
    var isComfirm,
        fileObj;

    open( File(psdFile.fsName) );

    fileObj  = new File( psdFile.fsName.replace(/(\.psd)$/, '.jpg').replace(psdDirName, jpgDir) );
    activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);
    activeDocument.close();
  }
})();
