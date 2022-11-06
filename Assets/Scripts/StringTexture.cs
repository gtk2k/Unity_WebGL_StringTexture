using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class StringTexture : MonoBehaviour
{
    public string Text;
    public string FontFamily;
    public string FontWeight;
    public string FontSize;
    public string TextColor;
    public int TextureWidth;
    public int TextureHeight = 0;

    void Start()
    {
        StringTextureLib.OnTextureCreated += StringTextureLib_OnTextureCreated;
        StringTextureLib.CreateStringTexture(
            Text,
            FontFamily,
            FontWeight,
            FontSize,
            TextColor,
            TextureWidth,
            TextureHeight);
    }

    private void StringTextureLib_OnTextureCreated(string url)
    {
        StartCoroutine(LoadTexture(url));
    }

    private IEnumerator LoadTexture(string url)
    {
        var req = UnityWebRequestTexture.GetTexture(url);
        yield return req.SendWebRequest();
        var tex = ((DownloadHandlerTexture)req.downloadHandler).texture;
        transform.localScale = new Vector3(transform.localScale.x, transform.localScale.x * (float)tex.height / (float)tex.width, transform.localScale.z);
        GetComponent<Renderer>().material.mainTexture = tex;
        StringTextureLib.StringTextureLib_ReleaseObjectUrl(url);
    }
}
