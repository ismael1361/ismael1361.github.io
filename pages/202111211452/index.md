<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpeg);">
#[Matrizes](./?page=archive&id=202111211452)
</div>

*21 - Nov, 2021*

O conceito de Matriz surgiu em meados de 1850 denominado por [James Joseph Sylvester](https://pt.wikipedia.org/wiki/James_Joseph_Sylvester). Mas o seu nome é mais antigo do que parece, dado por Cauchy, o nome Matriz vem de tableau (em português, "tabela") com o significado coloquial: local onde algo se gera ou cria. Sylvester era um matemático respeitado na álgebra britânica, e ele via as matrizes como mero ingrediente dos determinantes, mas com Arthur Cayley (um matemático que Sylvester conheceu na Universidade de Cambridge), elas passam a gradativamente mostrar sua importância.

O primeiro uso implícito da noção de matriz ocorreu com Lagrange que reduziu a caracterização dos máximos e mínimos, de uma função real de várias variáveis, ao estudo do sinal da forma quadrática associada à matriz das segundas derivadas dessa função. No estudo da álgebra linear é possível perceber que as matrizes são mais do que objetos estáticos, que gravam informações e dados, na realidade elas representam funções que agem em vetores transformando-os em outros vetores.

Matrizes são normalmente escritas em colchetes ou parênteses:

![Notação de Matrizes](%PUBLIC_URL%/assets/images/002.svg)

No entanto, até esse momento, o que nos interessa são apenas essas especificações ilustradas na imagem anterior, com isso, não iremos aprofundar muito na interpretação de álgebra de matrizes, este não é o nosso foco no momento. Vamos focar apenas nas partes que facilitem a nossa compreensão ao introduzir algoritmos para a nossa biblioteca de Matrizes em [JavaScript](./?page=archive&id=202110150947).

Temos que ter em mente os principais índices da matriz. Dois números \\(m\\) e \\(n\\), naturais e não nulos, chama-se de matriz \\(m \times n\\), toda tabela \\(A\\), formada por números reais distribuídos em \\(m\\) linhas e \\(n\\) colunas.

Os termos individuais da Matriz \\(A\\) geralmente denotados por \\(A_{ij}\\) onde \\(max[i]=m\\) e \\(max[j]=n\\) são as entradas da matriz. Quando as matrizes têm o mesmo tamanho, ou seja, têm o mesmo número de linhas e colunas que a outra, então essas duas matrizes podem ter seus elementos somados e subtraídos \\(1\\) a \\(1\\). Para multiplicar, no entanto, deve-se prestar atenção se o número de colunas da primeira matriz é igual ao número de linhas da segunda matriz. Dessa forma, percebe-se que as matrizes não comutam, logo (\\(A \ast B \neq B \ast A\\)). Toda matriz pode ser multiplicada por um escalar, novamente elemento por elemento.

Em linguagem de programação, uma matriz seria feito por vetores dentro de vetores, como esse exemplo:

```js

const matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

```

Onde temos um vetor contendo três vetores possuindo três valores de números inteiros, o que seja, uma matriz de 3 linhas com 3 colunas (\\(A_{3,3}\\)).



<br/>
<br/>
<br/>

##Trabalhando nisso ainda 👨🏽‍💻

<br/>
<br/>
<br/>

####Referências e fontes:

* ["Matriz (matemática)", 21 Nov 2021, Wikipédia](https://pt.wikipedia.org/wiki/Matriz_(matem%C3%A1tica))
* ["Matrix (mathematics)", 21 Nov 2021, Wikipédia](https://en.wikipedia.org/wiki/Matrix_(mathematics))
* ["Matrizes", Rafael Asth, 21 Nov 2021, TodaMatéria](https://www.todamateria.com.br/matrizes-resumo/)
* ["Matrices", 21 Nov 2021, MathsisFun](https://www.mathsisfun.com/algebra/matrix-introduction.html)