using AOT;
using System;
using System.Runtime.InteropServices;
using UnityEngine;

public class StringTextureLib : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern int StringTextureLib_CreateStringImage(
        string text,
        string fontFamily,
        string fontWeight,
        string fontSize,
        string textColor,
        int textureWidth,
        int textureHeight = 0);

    [DllImport("__Internal")]
    public static extern void StringTextureLib_DrawStringTexture(int textureId);
}
