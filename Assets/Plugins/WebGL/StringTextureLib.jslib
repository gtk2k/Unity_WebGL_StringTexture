var StringTextureLib = {
    StringTextureLib_CreateStringImage: function (
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
        var renderSize = createStringImage(
            text,
            fontFamily,
            fontWeight,
            fontSize,
            textColor,
            textureWidth,
            textureHeight);
        return renderSize;
    },

    StringTextureLib_DrawStringTexture: function (textureId) {
        console.log(`texutreId: ${textureId}, GL.Textures[textureId]:${GL.textures[textureId]}`);
        GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[textureId]);
        GLctx.texParameteri(GLctx.TEXTURE_2D, GLctx.TEXTURE_WRAP_S, GLctx.CLAMP_TO_EDGE);
        GLctx.texParameteri(GLctx.TEXTURE_2D, GLctx.TEXTURE_WRAP_T, GLctx.CLAMP_TO_EDGE);
        GLctx.texParameteri(GLctx.TEXTURE_2D, GLctx.TEXTURE_MIN_FILTER, GLctx.LINEAR);
        GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, true);
        GLctx.texSubImage2D(GLctx.TEXTURE_2D, 0, 0, 0, GLctx.RGBA, GLctx.UNSIGNED_BYTE, textureCanvas);
        GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, false);
    }
}
mergeInto(LibraryManager.library, StringTextureLib);
