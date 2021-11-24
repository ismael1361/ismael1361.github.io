<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpeg);">
#[Matrizes - Introdução](./?page=archive&id=202111211452)
</div>

*21 - Nov, 2021*

O conceito de Matriz surgiu em meados de 1850 denominado por [James Joseph Sylvester](https://pt.wikipedia.org/wiki/James_Joseph_Sylvester). Mas o seu nome é mais antigo do que parece, dado por Cauchy, o nome Matriz vem de tableau (em português, "tabela") com o significado coloquial: local onde algo se gera ou cria. Sylvester era um matemático respeitado na álgebra britânica, e ele via as matrizes como mero ingrediente dos determinantes, mas com Arthur Cayley (um matemático que Sylvester conheceu na Universidade de Cambridge), elas passam a gradativamente mostrar sua importância.

O primeiro uso implícito da noção de matriz ocorreu com Lagrange que reduziu a caracterização dos máximos e mínimos, de uma função real de várias variáveis, ao estudo do sinal da forma quadrática associada à matriz das segundas derivadas dessa função. No estudo da álgebra linear é possível perceber que as matrizes são mais do que objetos estáticos, que gravam informações e dados, na realidade elas representam funções que agem em vetores transformando-os em outros vetores.

Matrizes são normalmente escritas em colchetes ou parênteses:

![Notação de Matrizes](%PUBLIC_URL%/assets/images/002.svg)

No entanto, até esse momento, o que nos interessa são apenas essas especificações ilustradas na imagem anterior. Porém, não iremos aprofundar muito na interpretação de álgebra de matrizes, pois não é o nosso principal foco no momento. Vamos focar apenas nas partes na qual nos facilitam na compreensão ao introduzir algoritmos para a nossa biblioteca de Matrizes em [JavaScript](./?page=archive&id=202110150947).

Temos que ter em mente os principais conceitos da matriz. Dois números \\(m\\) e \\(n\\), naturais e não nulos, chama-se de matriz \\(m \times n\\), toda tabela \\(A\\), formada por números reais distribuídos em \\(m\\) linhas e \\(n\\) colunas.

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

Tendo isso em mente, podemos observar que existe um padrão a seguir. Repare que todas as linhas vetoriais possuem a mesma quantidade de colunas (valores). Na lógica, se uma das linhas possuir uma coluna a mais ou a menos que as outras linhas, isso significa que o vetor não representa uma matriz.

Então o nosso primeiro passo seria validar o vetor para ver se representa ou não uma matriz. Mas antes, vamos construir nosso ambiente montando a nossa **Classe**:

```js
class Matriz{
    constructor(...props){
        this.parse.apply(this, props);
    }

    parse(...props){
        //conteúdo...
    }
}
```

Damos o nome da nossa **Classe** de Matriz. No código, você talvez esteja se perguntando do por quê estamos convocando a função `parse` dentro do `constructor` ao invés de seguir com o conteúdo da função `parse` no próprio `constructor`, a explicação é bem simples do que parece, pois mais pra frente iremos utilizar esse mesmo conteúdo da função, para evitar duplicação de linhas de código ou talvez recriação de objeto da **Classe**, separar essa função seria uma ótima solução. Mas fique tranquilo se caso não compreendeu isso ainda, ao decorrer da construção da **Classe** isso será bem esclarecido. Esse tipo de método é mais conhecido por [otimização de código](https://devporai.com.br/5-dicas-para-otimizar-codigo-javascript/).

Mas afinal, para que serve essa função `parse`?

Como o próprio nome já disse, vamos analisar e padronizar o vetor para assegurar que seja representado como uma matriz. E é aí que entra a validação do vetor.

Ainda no mesmo código, veremos o seguinte trecho `parse(...props){`, repara que utilizamos um método Ninja, conhecido como [desestruturação de objetos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Estamos fazendo isso porque iremos aceitar um ou dois valores como atributos da função, entenda:

* Caso seja apenas um atributo, será para receber um vetor de matriz.
* Caso seja dois atributos, será para dois números inteiros, definindo a quantidade de linhas e colunas se caso quiser criar uma matriz vazia.

Vejamos na prática:

```js
//conteúdo...
    parse(...props){
        //armazenando o primeiro atributo para a validação se caso for um vetor
        let matriz = props[0];

        //verificando se são dois atributos com ambos numéricos
        if(props.length === 2 && props.every(a => typeof a === "number")){
            //criando uma matriz vazia com linhas e colunas predefinidas
            matriz = new Array(props[0]).fill(0).map(()=>new Array(props[1]).fill(0));
        //verificando se o valor é uma instância do objeto Matriz
        }else if(props[0] instanceof Matriz){
            //pegando os dados da matriz recebida
            matriz = props[0].data;
        }

        if(Matriz.valido(matriz) !== true){
            throw new Error("O parâmetro passado não é de natureza de matriz!");
        }

        //conteúdo...
    }
//conteúdo...
```

A primeira coisa que fizemos foi armazenar na variável `matriz` o primeiro atributo, para caso seja um vetor. Depois, fizemos a primeira verificação se caso esteja criando do zero uma nova matriz ou não, mas, se for o caso, criamos então uma nova matriz da seguinte forma: 

* Monte um vetor com `n` valores vazias que representaria as linhas;
* Como esse vetor é um vetor vazio e que está aguardando receber algum valor, a preenche com qualquer valor para poder trabalhar com ela;
* Com um vetor pronto para trabalhar, a mapea para substituir por vetores vazias com `n` valores que representará as colunas;
* Para cada vetor representando as colunas, a preenche então com `0`;

Daí temos uma matriz do zero, veja um exemplo:

```js
let linhas = 3, colunas = 2;

console.log(new Array(linhas).fill(0).map(()=>new Array(colunas).fill(0)));

/*Console resultado:
    [
        [0, 0],
        [0, 0],
        [0, 0]
    ]
*/
```

Ainda no código anterior, o próximo passo foi verificar se caso o que foi recebido foi uma [instância do próprio objeto](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Working_with_Objects) Matriz, se for o caso, pegamos então os dados de sua matriz armazenada na propriedade data. Em seguida, validamos então se até o momento o que foi passado a variável `matriz` é realmente de natureza matriz, caso contrário, emitimos um erro.

Agora, vamos criar a [função estática](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes/static) de `valido` em nossa **Classe**. Pois iremos precisar, futuramente, de convocá-lo sem precisar de criar ou recriar uma instância da **Classe**:

```js
//conteúdo...
    static valido(matriz){
        //verificar se é um vetor com pelo menos um valor
        if(Array.isArray(matriz) && matriz.length > 0){
            //verificar se todos os valores é um vetor
            return matriz.every((linha)=>{
                //verificar se o valor é um vetor para representar uma linha de uma matriz
                if(Array.isArray(linha)){
                    //verificar se todos os valores da linha é de natureza numérica
                    return linha.every(coluna => typeof coluna === "number");
                }
                return false;
            });
        //verificar se é uma instância de Matriz
        }else if(matriz instanceof Matriz){
            return true;
        }
        //retornar inválido se caso nenhuma das condições não atenderem
        return false;
    }
//conteúdo...
```

Logo temos um validador de matriz, veja uns exemplos:

```js
console.log(Matriz.valido([
    [0, 1, 2],
    [3, 4, 5]
]));

/*Console resultado:
    True
*/

console.log(Matriz.valido([
    [[0, "teste"],  1,  2],
    [           3, "4", 5]
]));

/*Console resultado:
    False
*/
```

Repare que, além de validar apenas uma matriz bidimensional, ele acaba validando uma matriz com a quantidade de colunas diferente entre as linhas. Mas vamos parar um pouco para analisar, digamos que você acidentalmente esqueceu de preencher um campo de uma certa coluna em uma linha, seguindo a lógica, esse campo específico não teria tal relevância para você, e desta forma, o seu valor seria equivalente a `0`. Com isso, devemos adaptar então a nossa biblioteca para entender que tais linhas com colunas a menos devem ser preenchidas por valor `0`.

Continuando com o código então, teríamos algo parecido como:

```js
//conteúdo...
    parse(...props){
        //conteúdo...

        //para pegar o tamanho máximo de colunas
        this.col = Math.max.apply(null, matriz.map(a => a.length));
        //para pegar o tamanho total do vetor, representando a quantidade de linhas
        this.row = matriz.length;

        //criando uma matriz vazia
        this.data = new Array(this.row).fill(new Array()).map(()=>new Array(this.col).fill(0));

        //rasterizando a matriz
        //i -> identificação da linha
        //j -> identificação da coluna
        matriz.forEach((colunas, i) => {
            //rasterizando as colunas da linha
            colunas.forEach((valor, j)=>{
                //pegando cada valor da linha e jogando para matriz vazia se caso o valor for numérico
                this.data[i][j] = typeof valor === "number" ? valor : 0;
            });
        });
    }
//conteúdo...
```

Até o momento, o código ficaria assim:

```js
class Matriz{
    constructor(...props){
        this.parse.apply(this, props);
    }

    parse(...props){
        let matriz = props[0];

        if(props.length === 2 && props.every(a => typeof a === "number")){
            matriz = new Array(props[0]).fill(0).map(()=>new Array(props[1]).fill(0));
        }else if(props[0] instanceof Matriz){
            matriz = props[0].data;
        }

        if(Matriz.valido(matriz) !== true){
            throw new Error("O parâmetro passado não é de natureza de matriz!");
        }

        this.col = Math.max.apply(null, matriz.map(a => a.length));
        this.row = matriz.length;

        this.data = new Array(this.row).fill(new Array()).map(()=>new Array(this.col).fill(0));

        matriz.forEach((colunas, i) => {
            colunas.forEach((valor, j)=>{
                this.data[i][j] = typeof valor === "number" ? valor : 0;
            });
        });
    }

    static valido(matriz){
        return (Array.isArray(matriz) && 
            matriz.length > 0 && matriz.every(linha => {
                return Array.isArray(linha) && 
                linha.every(coluna => typeof coluna === "number")
            })) || matriz instanceof Matriz;
    }
}
```

Testando ficaria assim:

```js
console.log(new Matriz([
    [0, 1, 2],
    [3, 4, 5]
]));

/*Console resultado:
    Matriz {col: 3, row: 2, data: Array(2)}
*/
```

<div class="btn-page">
    <div class="btn-page-prev"></div>
    <div class="btn-page-next"><a href="./?page=archive&id=202111242037">
        <div class="btn-page-sublabel">Próximo</div>
        <div class="btn-page-label">Determinante »</div>
    </a></div>
</div>

####Referências e fontes:

* ["Matriz (matemática)", 21 Nov 2021, Wikipédia](https://pt.wikipedia.org/wiki/Matriz_(matem%C3%A1tica))
* ["Matrix (mathematics)", 21 Nov 2021, Wikipédia](https://en.wikipedia.org/wiki/Matrix_(mathematics))
* ["Matrizes", Rafael Asth, 21 Nov 2021, TodaMatéria](https://www.todamateria.com.br/matrizes-resumo/)
* ["Matrices", 21 Nov 2021, MathsisFun](https://www.mathsisfun.com/algebra/matrix-introduction.html)