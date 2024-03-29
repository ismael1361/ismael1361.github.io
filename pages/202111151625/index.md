<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpg);">
#[Rede Neural Artificial - Conceito](./?page=archive&id=202111151625)
</div>

*15 - Nov, 2021*

Agora vamos entender melhor o conceito de RNAs na prática, como foi dito antes, iremos introduzir isso usando o [JavaScript](./?page=archive&id=202110150947). Você pode estar se perguntando se isso realmente seria possível realizar com JavaScript ao se tratar de cálculos complexos envolvendo [matrizes](./?page=archive&id=202111211452), e você tem razão em fazer esta pergunta, mas se surpreenderia com o que é possível fazer com essa linguagem de programação, a biblioteca de TensorFlow para JavaScript é um bom exemplo disso.

###Entendendo o conceito básico

Redes Neurais Artificiais são técnicas computacionais que apresentam um modelo matemático inspirado na estrutura neural de organismos inteligentes e que adquirem conhecimento através da experiência. Uma grande rede neural artificial pode ter centenas ou milhares de unidades de processamento; já o cérebro de um mamífero pode ter muitos bilhões de neurônios.

O sistema nervoso é formado por um conjunto extremamente complexo de células, os neurônios. Eles têm um papel essencial na determinação do funcionamento e comportamento do corpo humano e do raciocínio. Os neurônios são formados pelos dendritos, que são um conjunto de terminais de entrada, pelo corpo central, e pelos axônios que são longos terminais de saída.

![Neuronio Biológico](%PUBLIC_URL%/assets/images/002.jpg)

Os neurônios se comunicam através de sinapses. Sinapse é a região onde dois neurônios entram em contato e através da qual os impulsos nervosos são transmitidos entre eles. Os impulsos recebidos por um neurônio A, em um determinado momento, são processados, e atingindo um dado limiar de ação, o neurônio A dispara, produzindo uma substância neurotransmissora que flui do corpo celular para o axônio, que pode estar conectado a um dendrito de um outro neurônio B. O neurotransmissor pode diminuir ou aumentar a polaridade da membrana pós-sináptica, inibindo ou excitando a geração dos pulsos no neurônio B. Este processo depende de vários fatores, como a geometria da sinapse e o tipo de neurotransmissor.

![Neuronio Biológico - Sinapse](%PUBLIC_URL%/assets/images/003.gif)

Uma rede neural artificial é composta por várias unidades de processamento, cujo funcionamento é bastante simples. Essas unidades, geralmente são conectadas por canais de comunicação que estão associados a determinado peso. As unidades fazem operações apenas sobre seus dados locais, que são entradas recebidas pelas suas conexões. O comportamento inteligente de uma Rede Neural Artificial vem das interações entre as unidades de processamento da rede.

A operação de uma unidade de processamento, proposta por McCullock e Pitts em 1943, pode ser resumida da seguinte maneira:

* Sinais são apresentados à entrada;
* Cada sinal é multiplicado por um número, ou peso, que indica a sua influência na saída da unidade;
* É feita a soma ponderada dos sinais que produz um nível de atividade;
* Se este nível de atividade exceder um certo limite (threshold) a unidade produz uma determinada resposta de saída.

![Modelo de um Neurônio Artificial](%PUBLIC_URL%/assets/images/004.png)

Suponha que tenhamos \\(m\\) sinais de entrada \\(X\_1, X\_2, ..., X\_m\\) e pesos \\(W\_{j1}, W\_{j2}, ..., W\_{jm}\\) e limitador \\(t\\); com sinais assumindo valores booleanos (0 ou 1) e pesos valores reais.

Neste modelo, o nível de atividade a é dado por:

\\[x = \displaystyle\sum_1^m W\_{jm} \centerdot X\_m\\]

A saída \\(y\\) é resultante da função de ativação (limitador), no caso, iremos usar o exemplo de Binary step:

![Função de Ativação - Binary step](%PUBLIC_URL%/assets/images/005.png)

\\[y = \begin{dcases} 0, &\text{if } x < 0 \\\\ 1, &\text{if } x \geq 0 \end{dcases} \\]

A maioria dos modelos de redes neurais possui alguma regra de treinamento, onde os pesos de suas conexões são ajustados de acordo com os padrões apresentados. Em outras palavras, elas aprendem através de exemplos.

Arquiteturas neurais são tipicamente organizadas em camadas, com unidades que podem estar conectadas às unidades da camada posterior.

![Modelo de uma Rede Neural Artificial](%PUBLIC_URL%/assets/images/006.gif)

Usualmente as camadas são classificadas em três grupos:

* **Camada de Entrada**: onde os padrões são apresentados à rede;
* **Camadas Intermediárias** ou Escondidas: onde é feita a maior parte do processamento, através das conexões ponderadas; podem ser consideradas como extratoras de características;
* **Camada de Saída**: onde o resultado final é concluído e apresentado.

Uma rede neural é especificada, principalmente pela sua topologia, pelas características dos nós e pelas regras de treinamento, uma propriedade mais importante das redes neurais, habilidade de aprender de seu ambiente e com isso melhorar seu desempenho. Isso é feito através de um processo iterativo de ajustes aplicado a seus pesos (\\(W\_{jm}\\)), o treinamento. O aprendizado ocorre quando a rede neural atinge uma solução generalizada para uma classe de problemas.

Denomina-se algoritmo de aprendizado a um conjunto de regras bem definidas para a solução de um problema de aprendizado. Existem muitos tipos de algoritmos de aprendizado específicos para determinados modelos de redes neurais, estes algoritmos diferem entre si principalmente pelo modo como os pesos são modificados.

Outro fator importante é a maneira pela qual uma rede neural se relaciona com o ambiente. Nesse contexto existem os seguintes paradigmas de aprendizado:

* **Aprendizado Supervisionado**, quando é utilizado um agente externo que indica à rede a resposta desejada para o padrão de entrada;
* **Aprendizado Não Supervisionado** (auto-organização), quando não existe uma agente externo indicando a resposta desejada para os padrões de entrada;
* **Reforço**, quando um crítico externo avalia a resposta fornecida pela rede.

Denomina-se ciclo uma apresentação de todos os N pares (entrada e saída) do conjunto de treinamento no processo de aprendizado. A correção dos pesos num ciclo pode ser executado de dois modos:

1. **Modo Padrão**: A correção dos pesos acontece a cada apresentação à rede de um exemplo do conjunto de treinamento. Cada correção de pesos baseia-se somente no erro do exemplo apresentado naquela iteração. Assim, em cada ciclo ocorrem N correções.
2. **Modo Batch**: Apenas uma correção é feita por ciclo. Todos os exemplos do conjunto de treinamento são apresentados à rede, seu erro médio é calculado e a partir deste erro fazem-se as correções dos pesos.

<br/>
<br/>
<br/>

##Trabalhando nisso ainda 👨🏽‍💻

<br/>
<br/>
<br/>

<div class="btn-page">
    <div class="btn-page-prev"><a href="./?page=archive&id=202111141717">
        <div class="btn-page-sublabel">Voltar</div>
        <div class="btn-page-label">« Introdução</div>
    </a></div>
    <div class="btn-page-next"></div>
</div>

####Referências e fontes:

* ["Redes Neurais Artificiais", Professor André Ponce de Leon F. de Carvalho, SCC - ICMC - USP](https://sites.icmc.usp.br/andre/research/neural/)
* ["Activation function", Wikipedia, 19 Nov 2021](https://en.wikipedia.org/wiki/Activation_function)