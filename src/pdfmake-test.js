window.fontsHaveBeenLoaded = false;

function downloadVirtualFileSystem(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const vfs = JSON.parse(this.responseText);
            callback(vfs);
        }
    };
    xhttp.open("GET", "/vfs/vfs.json", true);
    xhttp.send();
}

function setupPdfMake(callback) {
    if (!window.fontsHaveBeenLoaded) {
        downloadVirtualFileSystem(function (vfs) {
            pdfMake.vfs = vfs;

            pdfMake.fonts = {
                KaigenSansJ: {
                    normal: 'KaigenSansJ-Regular.ttf',
                    bold: 'KaigenSansJ-Regular.ttf',
                    italics: 'KaigenSansJ-Regular.ttf',
                    bolditalics: 'KaigenSansJ-Regular.ttf'
                }
            }

            window.fontsHaveBeenLoaded = true;

            callback();
        });
    } else {
        callback();
    }
}

function generatePdf(text) {
    const docDefinition = {
        content: text,
        defaultStyle: {
            font: 'KaigenSansJ'
        }
    };

    setupPdfMake(function () {
        pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
            window.open(outDoc, 'pdf');
        });
    })
}