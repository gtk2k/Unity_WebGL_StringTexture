using System.Linq;
using UnityEngine;

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
        // 文字列をブラウザー側でレンダリングして文字列画像を生成し、レンダリング結果のサイズを取得
        var renderSize = StringTextureLib.StringTextureLib_CreateStringImage(
            Text,
            FontFamily,
            FontWeight,
            FontSize,
            TextColor,
            TextureWidth,
            TextureHeight);

        var renderWidth = renderSize / 10000;
        var renderHeight = renderSize % 10000;

        // 今回は幅に合わせてGameObjectのサイズを変更
        transform.localScale = new Vector3(1f, (float)renderHeight / (float)renderWidth, 1f);

        // レンダリングサイズでレンダーテクスチャーを生成
        var rt = new RenderTexture(renderWidth, renderHeight, 0, RenderTextureFormat.ARGB32, 0);
        var cb = rt.colorBuffer; // <- これをしないとテクスチャーポインター (textureId) 取得できない
        var textureId = (int)rt.GetNativeTexturePtr();
        GetComponent<Renderer>().material.mainTexture = rt;
        Debug.Log($"TextureWidth: {TextureWidth}, TextureHeight:{TextureHeight}, textureId:{textureId}");

        // レンダーテクスチャーに文字列画像を描画
        StringTextureLib.StringTextureLib_DrawStringTexture(textureId);

    }
}
