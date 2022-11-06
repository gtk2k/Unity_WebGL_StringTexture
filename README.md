# Unity_WebGL_StringTexture
&lt;canvas> を使って文字列を描画するサンプル

# StringTexture.js
*.jslib ファイルだと日本語でコメントするとコンパイルエラーになってしまうので、別途`StringTexture.js`というjsファイルを用意し、
そこに主要な処理を行う関数を記述し、*.jslibからはその関数を呼び出すようにしてます。
