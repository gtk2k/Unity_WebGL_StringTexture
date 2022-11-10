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
        // ��������u���E�U�[���Ń����_�����O���ĕ�����摜�𐶐����A�����_�����O���ʂ̃T�C�Y���擾
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

        // ����͕��ɍ��킹��GameObject�̃T�C�Y��ύX
        transform.localScale = new Vector3(1f, (float)renderHeight / (float)renderWidth, 1f);

        // �����_�����O�T�C�Y�Ń����_�[�e�N�X�`���[�𐶐�
        var rt = new RenderTexture(renderWidth, renderHeight, 0, RenderTextureFormat.ARGB32, 0);
        var cb = rt.colorBuffer; // <- ��������Ȃ��ƃe�N�X�`���[�|�C���^�[ (textureId) �擾�ł��Ȃ�
        var textureId = (int)rt.GetNativeTexturePtr();
        GetComponent<Renderer>().material.mainTexture = rt;
        Debug.Log($"TextureWidth: {TextureWidth}, TextureHeight:{TextureHeight}, textureId:{textureId}");

        // �����_�[�e�N�X�`���[�ɕ�����摜��`��
        StringTextureLib.StringTextureLib_DrawStringTexture(textureId);

    }
}
