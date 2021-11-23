<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/006.png);">
#[Mapeando um quadrado para um círculo](./?page=archive&id=202110171950)
</div>

*17 - Out, 2021*

Em um momento de curiosidade explorando pela plataforma do YouTube, me deparei com artes em ilustração e algo me chamou muita atenção em meio de tantos conteúdos, que foi a ferramenta de pigmento de cores HSV em um formato de disco num aplicativo para iOS chamado Procreate, como mostrado nesta imagem abaixo:

![Procreate - Paleta HSV em disco](%PUBLIC_URL%/assets/images/002.jpg)

Como programador, pensei em introduzir algo semelhante usando [JavaScript](./?page=archive&id=202110150947), a primeira coisa que fiz foi procurar por algum projeto desse tipo no GitHub. Após muitas pesquisas, encontrei o projeto [color-disc](https://github.com/afternoon2/color-disc) de [Jakub Antolak](https://github.com/afternoon2) com as mesmas intenções, mas, não atendeu as expectativas, pois havia uma falha bem notável ao brincar um pouco com a demonstração no [codepen.io](https://codepen.io/jakub_antolak/pen/LKxzpJ). O erro surgiu quando tive a necessidade de chegar até a cor absoluta da tonalidade (hue), o branco ou até mesmo o preto. Analisando o código fonte, percebi que a perspectiva estava como uma grade retangular e não em um espaço circular, como deveria ser.

![Exemplo de Jakub Antolak](%PUBLIC_URL%/assets/images/005.png)

Logo procurei corrigir esse erro, comecei a pensar de uma forma que introduzisse o mesmo efeito como a do Procreate (já que este é o nosso objetivo) e pensei em um tipo de cálculo de mapeamento que convertesse uma grade retangular para um espaço circular.

Imagine uma situação trabalhando com um controlador de jogo, você espera que as coordenadas do joystick sejam circulares. Na realidade, você obtém as informações de dois eixos separados, que se estendem por um quadro de coordenadas retangulares, então, você precisa analisar em como derivar uma maneira de mapear uma grade retangular para um espaço circular como este exemplo:

![Grade retangular para um espaço circular](%PUBLIC_URL%/assets/images/001.png)

Mas na verdade, por trás desse esquema existe uma equação matemática que será bem útil para o nosso objetivo. Essas equações podem ser encontradas neste [link](https://marc-b-reynolds.github.io/math/2017/01/08/SquareDisc.html) e nesse [artigo em PDF](https://arxiv.org/pdf/1709.07875.pdf). Mas iremos focar em apenas uma equação, a do Elliptical, que observando bem, seria perfeitamente semelhante ao do Procreate.

![Tipos de equações de mapeamento](%PUBLIC_URL%/assets/images/007.png)

##Derivação
####Explicando a equação

Pense em apenas um círculo unitário, pois qualquer generalização é apenas uma escala da equação resultante posteriormente. Isso significa que um ponto \\((x, e)\in P\\) é definido por:

\\[P = \\{(x, y) | x, e\in [-1, 1]\\}\\]

A forma como o mapeamento funciona é pensar em uma linha de constante \\(x\\) bem como uma linha de constante \\(e\\), que é mapeado para uma elipse. Isso significa que temos um requisito para ser verdadeiro, dado pela equação da elipse para uma constante \\(x\\):

\\[1 = \dfrac{x'^2}{x^2} + \dfrac{x'^2}{c^2}\\]

Para garantir que todos os pontos ao longo da curva no topo do círculo sejam atingidos, precisamos ter certeza de que para qualquer \\(x \in [−1,1]\\) a elipse passa pelo ponto

\\[(x', y') = \left(\frac{x}{\sqrt{2}}, \sqrt{1-\frac{x^2}{2}}\right)\\]

Conectar este ponto à primeira equação nos dá o coeficiente \\(c\\) para a elipse:

\\[\begin{array}{rrl}&amp; 1 &amp; = \frac{\frac{x^2}{2}}{x^2} + \frac{1-\frac{x^2}{2}}{c^2}\\\ \Leftrightarrow &amp; \frac{c^2}{2} &amp; = 1 - \frac{x^2}{2}\\\ \Leftrightarrow &amp; c &amp; = \sqrt{2 -x^2}\end{array}\\]

Para uma constante \\(x\\) a elipse é assim:

\\[1 = \frac{x'^2}{x^2} + \frac{y'^2}{2-x^2}\\]

Da mesma forma, podemos resolver para uma constante \\(e\\) e pegue a elipse:

\\[1 = \frac{x'^2}{2-y^2} + \frac{y'^2}{y^2}\\]

Resolvendo para \\(x'^2\\) nós temos:

\\[\begin{array}{rrl}&amp; 1 - \frac{y'^2}{2-x^2} &amp; = \frac{x'^2}{x^2}\\\ \Leftrightarrow &amp; x'^2 &amp; = x^2 \left(1-\frac{y'^2}{2-x^2}\right)\end{array}\\]

Conectar isso à segunda equação resulta em

\\[\begin{array}{rrl}&amp; 1 &amp; = \frac{x^2\left(1-\frac{y'^2}{2-x^2}\right)}{2-y^2} + \frac{y'^2}{y^2}\\\ \Leftrightarrow &amp; y^2(2-y^2)(2-x^2) &amp; = x^2y^2(2-x^2-y'^2)+y'^2(2-y^2)(2-x^2)\\\ \Leftrightarrow &amp; y'^2 &amp; = y^2\frac{(2-x^2)(2-y^2-x^2)}{(2-x^2)(2-y^2)-x^2y^2}\\\ &amp; &amp; = y^2\frac{(2-x^2)(2-y^2-x^2)}{4-2x^2-2y^2}\\\ &amp; &amp; = y^2\left(1-\frac{x^2}{2}\right)\\\ \Leftrightarrow &amp; y' &amp; = y\sqrt{1-\frac{x^2}{2}}\end{array}\\]

Usando simetria, obtemos o mapeamento de um quadrado no intervalo -1 a 1, para as coordenadas \\(x\\) e \\(y\\) para um círculo unitário. Como dito antes, resolver o caso geral é simplesmente normalizar para um quadrado no tamanho certo e dimensionar o resultado novamente depois.

\\[(x', y') = \left(x\sqrt{1-\frac{y^2}{2}}, y\sqrt{1-\frac{x^2}{2}}\right)\\]

##Código JavaScript

Uma função JavaScript que mapeia um ponto retangular para um espaço circular unitário pode ser implementada assim:

```js
function square_to_disc(x, y){
    return [
        x * Math.sqrt(1 - y * y / 2), 
        y * Math.sqrt(1 - x * x / 2)
    ];
}
```

Para inverter de um espaço círculo para coordenadas retangular, pode ser implementada assim:

```js
function disc_to_square(u, v){
    let u2 = u * u,
        v2 = v * v,
        r2 = u2 + v2;

    if(r2 > 1){return;}  //caso se estiver fora do disco

    let twosqrt2 = 2.0 * Math.sqrt(2.0),
        subtermx = 2.0 + u2 - v2,
        subtermy = 2.0 - u2 + v2,
        termx1 = subtermx + u * twosqrt2,
        termx2 = subtermx - u * twosqrt2,
        termy1 = subtermy + v * twosqrt2,
        termy2 = subtermy - v * twosqrt2;

    return [
        x = 0.5 * Math.sqrt(termx1) - 0.5 * Math.sqrt(termx2),
        y = 0.5 * Math.sqrt(termy1) - 0.5 * Math.sqrt(termy2)
    ];
}
```

Os valores devem ser passados entre ou igual a -1 e 1. Quanto mais próximo de -1; mais próximo do canto inferior esquerdo e quanto mais próximo de 1; mais próximo do canto superior direito, da mesma forma serve para um espaço circular. Agora, seguindo numa lógica HSV (tonalidade, saturação e valor), podemos dizer que quanto mais próximo de -1; menor é a saturação e valor e quanto mais próximo de 1; maior é a saturação e valor.

Agora, vamos aplicar esses conceitos realizando um exemplo de rasterização com o Canvas:

```html
<canvas id="main-canvas" width="400" height="400"/>
```

A princípio, iremos utilizar as dimensões de um quadrado de 400X400. No JavaScript vamos rasterizar por toda área do Canvas, pixel por pixel: 

```js
let c = document.getElementById("main-canvas"),
    ctx = c.getContext("2d");

let image_data = ctx.getImageData(0, 0, c.width, c.height);

for(let i = 0; i < image_data.data.length; i += 4){
    let y = Math.floor((i/4)/c.width),
        x = (i/4)-(y*c.width);

    let color = HSVtoRGB(0, (x/c.width), 1 - (y/c.height));

    image_data.data[i + 0] = color[0];
    image_data.data[i + 1] = color[1];
    image_data.data[i + 2] = color[2];
    image_data.data[i + 3] = 255;
}

ctx.putImageData(image_data, 0, 0);
```

Para a conversão de HSV para RGB, utilize:

```js
function HSVtoRGB(h, s, v){
    var r, g, b, i, f, p, q, t;
    if(arguments.length === 1){
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}
```

Assim, teremos esse resultado:

![Exemplo 1](%PUBLIC_URL%/assets/images/003.png)

Agora, para adquirir as coordenadas de mapeamento retangular para circular, primeiro devemos recapturar a lógica, já que temos que ter em mãos apenas os valores entre ou iguais a -1 e 1. Mas como fazer isso com uma coordenada de \\(x\\) e \\(y\\) assim como no código que fizemos para rasterizar toda a área do Canvas? 🧐

Na verdade, existem várias soluções, vejamos um exemplo de uma coordenada \\(x\\). Subtraia \\(x\\) pela largura da área dividida por 2 e com o resultado, divida por esta mesma largura. Faça o mesmo com o \\(y\\), só que ao invés de ser com a largura, será com a altura. Assim teremos resultados que precisamos para o mapeamento.

\\[(x, y) = \left(\frac{x-\frac{width}{2}}{\frac{width}{2}}, \frac{y-\frac{height}{2}}{\frac{height}{2}}\right)\\]

Agora, para converter de -1 a 1 para 0 a 1, some o valor por mais 1 e divida por 2:

\\[(u, v) = \left(\frac{u+1}{2}, \frac{v+1}{2}\right)\\]

Seguindo nesse conceito, o código ficaria desta forma:

```js
...

    let color = [255, 255, 255]; //cor padrão de fora do disco

    let mapping = disc_to_square((x - (c.width/2))/(c.width/2), (y - (c.height/2))/(c.height/2));

    if(Array.isArray(mapping)){ //para caso se estiver dentro do disco
        let u = mapping[0],
            v = mapping[1];

        color = HSVtoRGB(0, (u + 1)/2, 1 - ((v + 1)/2));
    }

...
```

Assim, teremos esse resultado:

![Exemplo 2](%PUBLIC_URL%/assets/images/004.png)

Com esse esquema, podemos afirmar que temos agora algo mais parecido com a do Procreate. Pois olhe bem, agora temos acesso a cor absoluta da tonalidade (hue), o branco e até mesmo o preto. Problema resolvido então, não concorda?

####Exemplo:

* [square2disc - contrariwise](https://codepen.io/ismaelexperiments/pen/dyzGgBV)
* [Color Wheel](https://codepen.io/ismaelexperiments/full/BMydKo)

####Referências e fontes:

* ["color-disc", Jakub Antolak, 13/11/2021](https://github.com/afternoon2/color-disc)
* [Jakub Antolak, 13/11/2021](https://github.com/afternoon2)
* ["Square/Disc mappings", Marc B. Reynolds, 08/01/2017](https://marc-b-reynolds.github.io/math/2017/01/08/SquareDisc.html)
* ["Elliptification of Rectangular Imagery", Joint Mathematics Meetings 2019, SIGMAA-ARTS](https://arxiv.org/pdf/1709.07875.pdf)