using AOT;
using System;
using System.Runtime.InteropServices;
using UnityEngine;

public class StringTextureLib : MonoBehaviour
{
    public static event Action<string> OnTextureCreated;

    [DllImport("__Internal")]
    private static extern void StringTextureLib_Init(Action<string> onTextureCreatedInternal);

    [DllImport("__Internal")]
    private static extern void StringTextureLib_CreateStringTexture(
        string text,
        string fontFamily,
        string fontWeight,
        string fontSize,
        string textColor,
        int textureWidth,
        int textureHeight = 0);

    [DllImport("__Internal")]
    public static extern void StringTextureLib_ReleaseObjectUrl(string url);

    [MonoPInvokeCallback(typeof(Action<string>))]
    private static void onTextureCreatedInternal(string url)
    {
        OnTextureCreated?.Invoke(url);
    }

    private void Awake()
    {
        StringTextureLib_Init(onTextureCreatedInternal);
    }

    public static void CreateStringTexture(
        string text, 
        string fontFamily, 
        string fontWeight, 
        string fontSize, 
        string textColor, 
        int textureWidth, 
        int textureHeight = 0)
    {
        StringTextureLib_CreateStringTexture(
            text,
            fontFamily,
            fontWeight,
            fontSize,
            textColor,
            textureWidth,
            textureHeight);
    }
}
