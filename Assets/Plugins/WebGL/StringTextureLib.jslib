var StringTextureLib = {
    $StringTextureLib_OnTextureCreated: null,

    StringTextureLib_Init__deps:['$StringTextureLib_OnTextureCreated'],
    StringTextureLib_Init: function (ptrOnTextureCreated) {
        window.onTextureCreated = function (url) {
            var bufferSize = lengthBytesUTF8(url) + 1;
            var ptrUrl = _malloc(bufferSize);
            stringToUTF8(url, ptrUrl, bufferSize);
            dynCall_vi(StringTextureLib_OnTextureCreated, ptrUrl);
        }
        StringTextureLib_OnTextureCreated = ptrOnTextureCreated;
    },

    StringTextureLib_CreateStringTexture: function (
        ptrText,
        ptrFontFamily,
        ptrFontWeight,
        ptrFontSize,
        ptrTextColor,
        textureWidth,
        textureHeight
    ) {
        const text = UTF8ToString(ptrText);
        const fontFamily = UTF8ToString(ptrFontFamily);
        const fontWeight = UTF8ToString(ptrFontWeight);
        const fontSize = UTF8ToString(ptrFontSize);
        const textColor = UTF8ToString(ptrTextColor);
        createStringTexture(
            text, 
            fontFamily, 
            fontWeight, 
            fontSize, 
            textColor, 
            textureWidth, 
            textureHeight);

        // charPositioner.style.width = `${textureWidth}px`;
        // charPositioner.style.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        // if(textureHeight !== 0) charPositioner.style.height = `${textureHeight}px`;

        // const chars = text.match(window.emojiSpliterRex); //.match(rex);
        // textureCanvas.width = textureWidth;
        // if(textureHeight !== 0) textureCanvas.height = textureHeight;
        // const ctx = textureCanvas.getContext('2d');
        // ctx.textAlign = 'start';
        // ctx.textBaseline = 'top';
        // ctx.fillStyle = textColor;
        // ctx.font = ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;

        // const spans = chars.map(function(c) {
        //     const span = document.createElement('span');
        //     span.style.whiteSpace = 'pre-line';
        //     span.classList.add('char');
        //     span.textContent = c;
        //     charPositioner.appendChild(span);
        //     return span;
        // });

        // const charRects = spans.map(function(span) {
        //     const rect = span.getBoundingClientRect();
        //     return rect;
        // });

        // const charPositionerRect = charPositioner.getBoundingClientRect();
        // if(textureHeight === 0) {
        //     charPositioner.height = charPositionerRect.height;
        // }

        // charRects.forEach(function(p, i) {
        //     ctx.fillText(chars[i], p.left - charPositionerRect.left, p.top - charPositionerRect.top);
        // });

        // textureCanvas.toBlob(function(blob) {
        //     const url = URL.createObjectURL(blob);
        //     window.onTextureCreated()
        // });
    },

    StringTextureLib_ReleaseObjectUrl: function (ptrObjectUrl) {
        const objectUrl = UTF8ToString(ptrObjectUrl);
        releaseObjectURL(objectUrl);
        //URL.revokeObjectURL(objectUrl);
    }
}
mergeInto(LibraryManager.library, StringTextureLib);
