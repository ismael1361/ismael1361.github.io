<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpg);">
#[Algoritmos para calcular as funções integradas](./?page=archive&id=%PAGE_ID%)
</div>

*06 - Jan, 2022*

Nesse artigo iremos introduzir algoritmos de funções internas de forma simplificada, como seno, cosseno, tangente, raiz quadrada, etc…, utilizando apenas as operações de adição, subtração, multiplicação e divisão. Essas funções internas são embutidas nos chips de computador usados pela maioria das calculadoras científicas e pelo Algebra Coach. A intenção desse artigo é tornar o estudo intuitivo a fim de ensinar um pouco sobre as simetrias, identidades e outras propriedades das funções e como elas são exploradas para fazer avaliações precisas das funções.

---

##Seno

Este algoritmo permite que o seno de qualquer ângulo seja calculado usando apenas as operações de adição, subtração, multiplicação e divisão. A idéia básica é usar uma aproximação polinomial (passo 4) para calcular o seno de um ângulo \\(x\\). Mas como essa aproximação só é precisa para \\(x\\) pequeno, devemos dar passos (1 a 3) para reduzir \\(x\\) ao menor ângulo que ainda tenha o mesmo valor da função seno.

![Quadrantes Sin](%PUBLIC_URL%/assets/images/002.gif)

1. **Use periodicidade**: Se \\(x\\) estiver no intervalo \\(0 \leq x \leq 360^\circ\\), vá para a etapa 2. Caso contrário, reduza x para que fique no intervalo \\(0 \leq x \leq 360^\circ\\) adicionando ou subtraindo um múltiplo adequado de \\(360^\circ\\) de (estamos assumindo que o ângulo \\(x\\) é medido em graus). Este novo \\(x\\) tem o mesmo valor da função seno que o \\(x\\) original tem.

2. **Use simetria**: Se \\(x\\) estiver no quadrante 1, vá para o passo 3. Caso contrário, se estiver no quadrante 2, chame de \\(x\_{2}\\), se estiver no quadrante 3, chame de \\(x\_{3}\\) e se estiver no quadrante 4, chame de \\(x\_{4}\\).

    O gráfico mostra que quatro ângulos: \\(x, x\_{2}, x\_{3} e x\_{4}\\), todos têm o mesmo valor da função seno (exceto para um sinal \\(−\\)). Assim, em vez de calcular o seno de \\(x\_{2}\\) , \\(x\_{3}\\) ou \\(x\_{4}\\) podemos calcular o seno de \\(x\\) (o vermelho no quadrante 1) e apenas anexar um sinal de \\(−\\) à resposta se o ângulo estiver no quadrante 3 ou 4. Aqui estão alguns exemplos. Em cada caso, o ângulo do quadrante 1 é encontrado usando a simetria da função seno:

    * \\(sin(110^\circ) = sin(70^\circ)\\)
    * \\(sin(200^\circ) = −sin(20^\circ) \gets anexar\ um\ sinal\ −\\)
    * \\(sin(330^\circ) = −sin(30^\circ) \gets anexar\ um\ sinal\ −\\)

3. **Use a cofunção**: O argumento \\(x\\) agora foi reduzido para estar entre \\(0^\circ\\) e \\(90^\circ\\). Se for menor que \\(45^\circ\\), vá para o passo 4. Caso contrário, pode ser ainda menor usando o seguinte truque: em vez de calcular \\(sin(x)\\), calculamos \\(cos(90^\circ −  x )\\). Esta imagem mostra por que podemos substituir o seno de um ângulo grande, \\(B\\), pelo cosseno de um ângulo pequeno, \\(S\\):

    ![Etapa 3](%PUBLIC_URL%/assets/images/003.png)

    Defina \\(x\\) para o pequeno ângulo \\(S\\). O ângulo \\(x\\) agora é pequeno o suficiente para aplicar a aproximação polinomial. [Clique aqui](#cosseno) para usar o polinômio cosseno ou vá para a etapa 4 para usar o polinômio seno.

4. **Use o polinômio seno**: Se o ângulo \\(x\\) estiver em graus, converta-o em radianos multiplicando-o por \\(\dfrac{\pi}{180}\\). Em seguida, substitua \\(x\\) na fórmula:

    ![Etapa 4](%PUBLIC_URL%/assets/images/004.gif)

    Para \\(x \leq \dfrac{\pi}{4}\\) radianos (ou seja, \\(45^\circ\\)), este polinômio tem precisão de \\(\pm0,00004\\).

<br/><br/>
**Exemplo**: calcule o \\(sen(565^\circ)\\). Aqui estão os passos

1. \\(= sin(205^\circ) \gets use\ a\ periodicidade\ da\ função\ sin\\)
2. \\(= -sin(25^\circ) \gets use\ a\ simetria\ da\ função\ sin\\)
3. nada para fazer; o argumento já é inferior a \\(45^\circ\\)
4. \\(\Bigg({\big(\big)}\Bigg)\\)

<br/>
<br/>
<br/>

##Trabalhando nisso ainda 👨🏽‍💻

<br/>
<br/>
<br/>

####Referências e fontes:

* ["Algorithms for calculating the built-in functions", 06 Jan 2022, mathonweb.com](https://mathonweb.com/help_ebook/html/algorithms.htm)