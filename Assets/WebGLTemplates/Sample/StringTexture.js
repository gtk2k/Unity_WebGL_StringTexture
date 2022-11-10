function createStringImage(
    text,
    fontFamily,
    fontWeight,
    fontSize,
    textColor,
    textureWidth,
    textureHeight
) {
    textureCanvas.width = textureWidth;
    charPositioner.style.maxWidth = `${textureWidth}px`;
    charPositioner.style.font = `${fontWeight} ${fontSize} ${fontFamily}`;

    // 文字配列への変換は [...text] がシンプルなのだが、
    // これだと絵文字が分解されて配列に変換されてしまう
    // [..."👨‍👨‍👧‍👧"] -> ['👨', '‍', '👨', '‍', '👧', '‍', '👧']
    // 絵文字も1文字単位で分割するために正規表現を使う
    const emojiSpliterRex = /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*|./gus;
    const chars = text.match(emojiSpliterRex); //.match(rex);
    // textureHeight !== 0 の場合はテクスチャーの高さを固定する
    if (textureHeight !== 0) charPositioner.style.height = `${textureHeight}px`;

    // 1文字単位で <span> に変換して charPositioner に追加する
    const spans = chars.map(c => {
        const span = document.createElement('span');
        span.style.whiteSpace = 'pre-line';
        span.textContent = c;
        charPositioner.appendChild(span);
        return span;
    });

    // 1文字単位で文字の位置を取得する
    const charRects = spans.map(span => {
        const rect = span.getBoundingClientRect();
        return rect;
    });

    // 描画結果のサイズ(高さ)を取得し textureCanvas も同じサイズにする
    const charPositionerRect = charPositioner.getBoundingClientRect();
    textureCanvas.width = charPositionerRect.width;
    textureCanvas.height = charPositionerRect.height;

    // <canvas> のコンテキストを取得し、文字列描画のための各種設定を行う
    const ctx = textureCanvas.getContext('2d');
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    ctx.fillStyle = textColor;
    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;

    // 文字位置取得を終えたら 役目が終わったので <span> をクリアする
    spans.forEach(span => span.remove());

    // 取得した1文字単位の位置をもとに文字を描画する
    charRects.forEach((p, i) => {
        ctx.fillText(chars[i], p.left - charPositionerRect.left, p.top - charPositionerRect.top);
    });

    // charPositioner のサイズを Unity に渡す
    return charPositionerRect.width * 10000 + charPositionerRect.height;
}
