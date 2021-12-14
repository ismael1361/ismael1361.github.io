<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpg);">
#[Matrizes - Determinante](./?page=archive&id=202111242037)
</div>

*24 - Nov, 2021*

**Determinante** é uma [função matricial](https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_matricial) que associa a cada matriz quadrada um escalar, ou seja, é uma função que transforma uma matriz quadrada em um número real, permitindo saber se a matriz tem ou não inversa, pois as que não têm são precisamente aquelas cujo determinante é igual a `0`. O determinante de uma matriz \\(A\\) é denotado por \\(det(A)\\), \\(det A\\) ou \\(|A|\\).

Para as matrizes de ordem 1, o valor do determinante é o próprio elemento:

\\[det(a\_{1\times 1}) = a\_{1\times 1}\\]

```js
//conteúdo...
    if((matriz.row * matriz.col) === 1){
        return matriz.data[0][0];
    }
//conteúdo...
```

No caso de matrizes de ordem `2`, multiplicam-se os elementos da diagonal principal e diminui-se do resultado a multiplicação dos elementos da diagonal secundária, ou seja:

\\[\def\arraystretch{1.5} \begin{array}{cl} &amp; det\bigg(\begin{matrix} a & b \\\\ c & d\end{matrix}\bigg) = \biggm\vert\begin{matrix} a & b \\\\ c & d\end{matrix}\biggm\vert \\\\ \implies &amp; ad - bc \end{array}\\]

```js
//conteúdo...
    if(matriz.row * matriz.col === 4){
        return (matriz.data[0][0] * matriz.data[1][1]) - (matriz.data[0][1] * matriz.data[1][0]);
    }
//conteúdo...
```

Para matrizes de ordem 3, pode ser utilizada a [Regra de Sarrus](https://pt.wikipedia.org/wiki/Regra_de_Sarrus), a qual fornece:

\\[\begin{array}{cl} &amp; det\Bigg(\begin{matrix} a & b & c \\\\ d & e & f  \\\\ g & h & i \end{matrix}\Bigg) = \Biggm\vert\begin{matrix} a & b & c \\\\ d & e & f  \\\\ g & h & i \end{matrix}\Biggm\vert \\\\ \\\\ \implies &amp; (aei + bfg + cdh) - (afh + bdi + ceg) \end{array}\\]

De modo geral, para uma matriz de ordem \\(n\\), com \\(n\geq 2\\), pode-se utilizar de dois outros processos, conhecidos como [fórmula de Laplace](https://pt.wikipedia.org/wiki/Teorema_de_Laplace) e [fórmula de Leibniz para determinantes](https://pt.wikipedia.org/wiki/F%C3%B3rmula_de_Leibniz_para_determinantes).

Com isso, a matriz deve ser quadrada (mesmo número de linhas e colunas) como esta:

```js

const matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

```

Para calcular o determinante de uma matriz \\(3\times 3\\), podemos seguir o conceito do algoritmo chamado de [Expansão de Laplace](https://en.wikipedia.org/wiki/Laplace_expansion):

1. \\(A\_{0,0} \ast det(a\_{2\times 2})\\) que é excluída da linha e coluna de \\(A_{0,0}\\)
2. \\(A\_{0,1} \ast det(a\_{2\times 2})\\) que é excluída da linha e coluna de \\(A_{0,1}\\)
3. \\(A\_{0,2} \ast det(a\_{2\times 2})\\) que é excluída da linha e coluna de \\(A_{0,2}\\)

Tecnicamente, não é necessário pegar os valores da primeira linha da matriz e multiplicá-los pelas matrizes restantes - pode realmente funcionar se você usar qualquer linha. Este método também é muito ineficiente para matrizes de grande tamanho. Existem maneiras muito mais eficientes de calcular o determinante de grandes matrizes quadradas.

Faremos então uma uma função `det()` que trabalhe com matrizes \\(3\times 3\\) para entendermos melhor o básico de como seria aplicado em nosso código. Essa função irá funcionar recursivamente, que nesse caso, na base de uma matriz \\(2\times 2\\), que é muito simples de calcular o determinante. Também precisaremos escrever uma função que exclua uma linha e coluna específicas de uma matriz para continuar com o algoritmo mencionado acima e, para isso, usaremos a função de emenda.

```js
function det(matriz){
    if(matriz.row * matriz.col === 4){
        return (matriz.data[0][0] * matriz.data[1][1]) - (matriz.data[0][1] * matriz.data[1][0]);
    }

    return matriz.data[0][0]*det(removerLinhaEColuna(matriz,0)) - 
           matriz.data[0][1]*det(removerLinhaEColuna(matriz,1)) +
           matriz.data[0][2]*det(removerLinhaEColuna(matriz,2));
}

function removerLinhaEColuna(matriz, index){
    var temp = [];
    for (var i=0; i<matriz.row; i++){ temp.push(matriz.data[i].slice(0)); }
    temp.splice(0, 1); 
    for (var i=0; i<temp.length; i++) { temp[i].splice(index,1); } 
    return new Matriz(temp);
}

var M = new Matriz([
    [1,2,3],
    [4,5,6],
    [7,1,9]
]);

console.log(det(M));

/*Console resultado:
    -42
*/
```

O padrão simplesmente continua agora para matrizes maiores, por exemplo, para a matriz:

\\[\begin{bmatrix} a & b & c & d \\\\ e & f & g & h \\\\ i & j & k & l \\\\ m & n & o & p \end{bmatrix}\\]

O determinante, portanto, seria:

\\[det(a\_{4\times 4}) = a \ast det([fgh, jkl, nop]) - b \ast det([egh, ikl, mop]) + ...\\]

Portanto, como nosso código acima é executado recursivamente, ele deve funcionar para uma matriz de qualquer tamanho 4x4 ou maior. Abaixo está o código final para determinar o determinante de qualquer matriz quadrada de tamanho.

```js
function det(matriz){
    if(matriz.row * matriz.col === 4){
        return (matriz.data[0][0] * matriz.data[1][1]) - (matriz.data[0][1] * matriz.data[1][0]);
    }

    let resultado = 0;
    for(let i=0; i<matriz.row; i++){ 
        resultado += Math.pow(-1, i) * matriz.data[0][i]*det(removerLinhaEColuna(matriz, i)); 
    }
    return resultado;
}

//conteúdo...

var M = new Matriz([
    [1,2,3,4],
    [5,6,7,8],
    [9,1,2,3], 
    [4,5,9,7]
]);

console.log(det(M));

/*Console resultado:
    216
*/
```

Com tudo, podemos simplificar o código chegando nesse resultado para a nossa **Classe**:

```js
//conteúdo...
    static det(matriz){
        try{
        	matriz = matriz instanceof Matriz ? matriz : new Matriz(matriz);
        }catch(e){
        	matriz = new Matriz([[]]);
        }

        if(matriz.row !== matriz.col){
        	throw new Error("A matriz fornecida não é uma matriz quadrada, é necessária que o número de linhas seja igual ao número de colunas!");
            return;
        }else if((matriz.row * matriz.col) === 1){
            return matriz.data[0][0];
        }else if(matriz.row * matriz.col === 4){
            return (matriz.data[0][0] * matriz.data[1][1]) - (matriz.data[0][1] * matriz.data[1][0]);
        }

        return matriz.data[0].reduce((r, e, i) => {
            return r + Math.pow(-1, i) * e * Matriz.det(matriz.data.slice(1).map(c => {
                return c.filter((_, j) => i != j);
            }));
        }, 0);
    }

    det(){return Matriz.det(this);}
//conteúdo...
```

Testando, teríamos algo parecido como:

```js
console.log(Matriz.det([
    [6,  1, 1],
    [4, -2, 5],
    [2,  8, 7]
]));

/*Console resultado:
    −306
*/

var M = new Matriz([
    [1,2,3,4],
    [5,6,7,8],
    [9,1,2,3], 
    [4,5,9,7]
]);

console.log(M.det());

/*Console resultado:
    216
*/
```

<div class="btn-page">
    <div class="btn-page-prev"><a href="./?page=archive&id=202111211452">
        <div class="btn-page-sublabel">Voltar</div>
        <div class="btn-page-label">« Introdução</div>
    </a></div>
    <div class="btn-page-next"><a href="./?page=archive&id=202111281430">
        <div class="btn-page-sublabel">Próximo</div>
        <div class="btn-page-label">Matriz transposta »</div>
    </a></div>
</div>

####Referências e fontes:

* ["Determinante", 24 Nov 2021, Wikipédia](https://pt.wikipedia.org/wiki/Determinante)
* ["Determinant of a Matrix", 24 Nov 2021, MathsIsFun.com](https://www.mathsisfun.com/algebra/matrix-determinant.html)
* ["Determinant of a matrix in JavaScript using Laplace expansion", mrdaniel, 24 Dez 2015, Coderbyte](https://coderbyte.com/tutorial/determinant-of-a-matrix-in-javascript-using-laplace-expansion)