<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpg);">
#[Por que JavaScript?](./?page=archive&id=202110150947)
</div>

*15 - Out, 2021*

Ao âmbito de todos os artigos e projetos publicados/publicarei nessa Web Página, serão baseados na linguagem de programação JavaScript. A escolhi pelo simples motivo dela se enquadrar em uma das linguagens mais populares por entre os desenvolvedores no momento, por esse motivo, utilizá-lo seria mais fácil a compreensão, interpretação e conversão para outras linguagens. Mas afinal, o que é JavaScript? Por que sua tendência tem aumentado ultimamente? Vale a pena desenvolver em JavaScript?

JavaScript (ou JS, se preferir assim chamar) surgiu em meados de 1995, é e pode ser introduzida como uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. A princípio foi pensado para trabalhar como programação cliente-side juntamente com HTML e CSS em World Wide Web, permitindo interatividade em páginas da Web e, portanto, é uma parte essencial dos aplicativos da web. Mas daí surgiu o tão famoso e amado por todos o Node.js, tornando possível a programação do server-side utilizando JavaScript.

A partir disso, o JavaScript se tornou uma tendência enorme para desenvolvimento em server-side e aplicações nativas (ou até mesmo híbridas) utilizando tecnologias, ferramentas e bibliotecas como React Native, Ionic, Apache Cordova, PhoneGap, NativeScript, etc...

Como uma linguagem multiparadigma, o JavaScript suporta estilos de programação orientados a eventos, funcionais e imperativos, apresentando recursos como fechamentos e funções de alta ordem comumente indisponíveis em linguagens populares como Java e C++. Possui APIs para trabalhar com texto, matrizes, datas, expressões regulares e o DOM, mas a linguagem em si não inclui nenhuma E/S (por enquanto), como instalações de rede, armazenamento ou gráficos, contando com isso no ambiente host em que está embutido.

Embora existam semelhanças entre JavaScript e Java, incluindo o nome da linguagem, a sintaxe e as respectivas bibliotecas padrão, as duas linguagens são distintas e diferem muito no design; JavaScript foi influenciado por linguagens de programação como Self e Scheme. É baseada em ECMAScript, padronizada pela Ecma international nas especificações ECMA-262 e ISO/IEC 16262.

Agora, vale ressaltar que JavaScript não é um tipo de programação multi-thread como Java ou .NET, o que significa que tem apenas uma pilha de chamadas que é usada para executar o programa. A pilha de chamadas é igual à estrutura de dados da pilha que você pode ler em estruturas de dados. Como sabemos, as pilhas são FILO que são o primeiro a entrar, o último a sair. Da mesma forma, dentro da pilha de chamadas, sempre que uma linha de código entra na pilha de chamadas, ela é executada e sai da pilha. Dessa forma, o JavaScript é uma linguagem de programação single-thread  por causa de apenas uma pilha de chamadas.

![single thread vs multi thread](%PUBLIC_URL%/assets/images/002.png)

###Por que ter uma single-thread é uma limitação?

Imagine, por exemplo, um algoritmo complexo de transformação de imagem que está sendo executado no navegador.

Enquanto a call stack tem funções para executar, o navegador não pode fazer mais nada — está sendo bloqueado. Isso significa que o navegador não pode renderizar, não pode executar nenhum outro código, está apenas preso. E aí vem o problema: a interface do seu aplicativo não é mais eficiente e agradável. Em alguns casos, isso pode não ser um problema tão crítico.

Depois que o navegador iniciar o processamento de muitas tarefas na call stack, ele poderá deixar de responder por muito tempo. Nesse ponto, muitos navegadores realizariam um erro, perguntando se deveriam terminar a página:

![Erro de página](%PUBLIC_URL%/assets/images/003.jpeg)

###Os blocos de construção de um programa JavaScript

![JavaScript - blocos de construção](%PUBLIC_URL%/assets/images/005.png)

Ao programar em JavaScript estaria certamente desenvolvendo seu programa composto de vários blocos mais comum como uma função, dos quais apenas um será executado agora e o restante será executado posteriormente.

O problema que muitos desenvolvedores novatos em JavaScript parecem ter é entender que depois não acontece necessariamente e imediatamente depois de agora. Em outras palavras, tarefas que não podem ser concluídas agora são, por definição, concluídas de forma assíncrona, o que significa que você não terá o comportamento de bloqueio mencionado acima, como você poderia ter esperado ou esperado inconscientemente.

Você provavelmente está ciente de que as solicitações Ajax padrão não são concluídas de forma síncrona, o que significa que, no momento da execução do código, a função ajax ainda não possui nenhum valor para retornar a ser atribuída a uma variável de resposta.

![Assíncrona e Síncrona](%PUBLIC_URL%/assets/images/004.jpg)

Uma maneira simples de “aguardar” que uma função assíncrona retorne seu resultado é usar uma função chamada retorno de chamada, mais conhecido como Callbacks.

Agora, em requisições deste porte, nunca a realize sincronicamente, pois a interface do usuário do seu aplicativo JavaScript será bloqueada — o usuário não poderá realizar outra tarefa até que a requisição estiver concluída, como clicar, inserir dados, navegar ou rolar. Seria uma prática terrível.

Usamos uma solicitação do Ajax apenas como exemplo. Você pode ter qualquer parte do código executada de forma assíncrona.

Isso pode ser feito com a função `setTimeout(callback, milliseconds)`. O que a função setTimeout faz é configurar um evento para acontecer mais tarde de acordo com o tempo (milissegundos) que determinar, por exemplo:

```js
console.log('A');
   
setTimeout(() => {
    console.log('B');
}, 3000);
    
console.log('C');
```

A saída no console será a seguinte:

```js
-> A
-> C
-> B
```

###Quais são suas vantagens?

Graças à essa arquitetura focada em concorrência de operações e minimização do tempo ocioso das threads, é possível conseguir uma performance muito boa e muito estável, se comparado às grandes plataformas que temos dominando o mercado de hoje.

![Comparativo](%PUBLIC_URL%/assets/images/006.png)

![Comparativo](%PUBLIC_URL%/assets/images/007.png)

![Comparativo](%PUBLIC_URL%/assets/images/008.gif)

Além da performance a nível de aplicação, também deve-se levar em consideração a curva de aprendizado de construção de um software usando JavaScript de ponta-a-ponta.

JavaScript é uma linguagem muito fácil de se aprender e muito rápida para se usar. Você não precisa escrever muito código para fazer operações com valor. Embora praticamente tudo no mundo JS seja objeto, essa não é uma linguagem que liga muito para tipos de dados, o que a torna muito flexível e ainda mais fácil para quem vem do mundo Python ou PHP.

Um outro grande problema que uma empresa enfrenta ao manter uma ferramenta Web cujo servidor utiliza uma outra linguagem que não seja JavaScript, é a questão do domínio da equipe sobre o sistema. Se torna necessário que a empresa tenha uma equipe especializada nas tecnologias de Front-end(HTML, CSS, JavaScript, etc.) e outra especializada nas tecnologias de Back-end utilizadas(Java, Python, PHP, SQL, etc.). Não há como garantir que as duas equipes conversariam tão bem quanto se ambas trabalhassem com as mesmas tecnologias. Se o projeto for escrito em uma mesma linguagem de ponta-a-ponta, é possível, inclusive, diminuir custos com as equipes, já que poderia ocorrer intercâmbios de profissionais quando necessário. O JavaScript possibilita isso sem perda de qualidade ou performance.

Uma aplicação em JavaScript é altamente escalável e extensível. É muito fácil implementar funcionalidades em um sistema desenvolvido com a linguagem. Embora a manutenção do código seja bem complicada e custosa se escrito “puro”, sem a ajuda das ferramentas que a comunidade fornece, com o uso de tais ferramentas todo o processo de desenvolvimento, otimização, manutenção, teste, integração e atualização se torna tão descomplicado quanto um clique.

###Conclusão

Hoje o JavaScript é uma das principais tendências para o desenvolvimento de projetos e tem uma comunidade crescente. Várias grandes empresas estão apostando muito nisso. Como qualquer outra linguagem, ela também tem seus defeitos e desvantagens, mas, no geral, oferece uma relação “custo x benefício” muito boa.

É muito importante estar sempre em busca de conhecimento sobre as melhores formas de aproveitar o máximo das tecnologias disponíveis para resolver seu problema, até por conta da velocidade com que novas tecnologias surgem com novas propostas. Pode ser que nem sempre o JavaScript seja a sua resposta. Mas o ter como uma possibilidade, é um ótimo caminho para resolver seus problemas.

<br/><br/><br/>

####Referências e fontes:

* ["JavaScript", Wikipedia](https://pt.wikipedia.org/wiki/JavaScript)
* ["Why JavaScript is a single-thread language that can be non-blocking?", Easy, 22 Jan 2021, GeeksforGeeks](https://www.geeksforgeeks.org/why-javascript-is-a-single-thread-language-that-can-be-non-blocking/)
* ["Como o Javascript funciona: O event loop e o surgimento da programação assíncrona + 5 maneiras de codificar melhor com async/await", Robisson Oliveira, 22 Fev 2019, Medium](https://medium.com/reactbrasil/como-o-javascript-funciona-o-event-loop-e-o-surgimento-da-programa%C3%A7%C3%A3o-ass%C3%ADncrona-5-maneiras-de-18d0b8d6849a)
* ["Por que você deve aprender JavaScript?", Fred Souza, 14 Mai 2015, Medium](https://medium.com/@fredamsouza/por-que-voc%C3%AA-deve-aprender-javascript-92b7ea02580a)