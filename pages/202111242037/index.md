<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpg);">
#[Matrizes - Determinante](./?page=archive&id=202111242037)
</div>

*24 - Nov, 2021*

**Determinante** é uma [função matricial](https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_matricial) que associa a cada matriz quadrada um escalar, ou seja, é uma função que transforma uma matriz quadrada em um número real, permitindo saber se a matriz tem ou não inversa, pois as que não têm são precisamente aquelas cujo determinante é igual a `0`. O determinante de uma matriz \\(A\\) é denotado por \\(det(A)\\), \\(det A\\) ou \\(|A|\\).

Para as matrizes de ordem 1, o valor do determinante é o próprio elemento:

\\[det(a\_{11}) = a\_{11}\\]

No caso de matrizes de ordem `2`, multiplicam-se os elementos da diagonal principal e diminui-se do resultado a multiplicação dos elementos da diagonal secundária, ou seja:

\\[\def\arraystretch{1.5} \begin{array}{cl} &amp; det\bigg(\begin{matrix} a & b \\\\ c & d\end{matrix}\bigg) = \biggm\vert\begin{matrix} a & b \\\\ c & d\end{matrix}\biggm\vert \\\\ \implies &amp; ad - bc \end{array}\\]

Para matrizes de ordem 3, pode ser utilizada a [Regra de Sarrus](https://pt.wikipedia.org/wiki/Regra_de_Sarrus), a qual fornece:

\\[\begin{array}{cl} &amp; det\Bigg(\begin{matrix} a & b & c \\\\ d & e & f  \\\\ g & h & i \end{matrix}\Bigg) = \Biggm\vert\begin{matrix} a & b & c \\\\ d & e & f  \\\\ g & h & i \end{matrix}\Biggm\vert \\\\ \\\\ \implies &amp; (aei + bfg + cdh) - (afh + bdi + ceg) \end{array}\\]

De modo geral, para uma matriz de ordem \\(n\\), com \\(n\geq 2\\), pode-se utilizar de dois outros processos, conhecidos como [fórmula de Laplace](https://pt.wikipedia.org/wiki/Teorema_de_Laplace) e [fórmula de Leibniz para determinantes](https://pt.wikipedia.org/wiki/F%C3%B3rmula_de_Leibniz_para_determinantes).

<br/>
<br/>
<br/>

##Trabalhando nisso ainda 👨🏽‍💻

<br/>
<br/>
<br/>

<div class="btn-page">
    <div class="btn-page-prev"><a href="./?page=archive&id=202111211452">
        <div class="btn-page-sublabel">Voltar</div>
        <div class="btn-page-label">« Introdução</div>
    </a></div>
    <div class="btn-page-next"></div>
</div>

####Referências e fontes:

* ["Determinante", 24 Nov 2021, Wikipédia](https://pt.wikipedia.org/wiki/Determinante)
* ["Determinant of a Matrix", 24 Nov 2021, MathsIsFun.com](https://www.mathsisfun.com/algebra/matrix-determinant.html)
* ["Determinant of a matrix in JavaScript using Laplace expansion", mrdaniel, 24 Dez 2015, Coderbyte](https://coderbyte.com/tutorial/determinant-of-a-matrix-in-javascript-using-laplace-expansion)