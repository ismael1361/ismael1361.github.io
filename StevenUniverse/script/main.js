(function(){
  var namesMenu = ["Steven", "Garnet", "Pérola", "Ametista", "Connie", "Peridot", "Lapis Lazuli", "Leão", "Rubi", "Safira"],
      pages = [
        {
          title: "Steven Quartz Universo",
          wiki: "Steven Quartz Universo (ou apenas Steven) é o personagem principal da série. Steven é o filho de Rose Quartz, a ex-líder das Crystal Gems, e passa a viver com elas. Ao mesmo tempo que convive com a vida humana em Beach City, também convive com o mundo Gem, indo atrás de artefatos Gems, derrotando Gems Corrompidas e descobrindo sobre o passado das Gems do Planeta Natal, que tentaram colonizar a Terra.",
          img: "steven.png",
          colors: ["#E91E63", "#AD1457"]
        },
        {
          title: "Garnet",
          wiki: "Garnet é uma das protagonistas de Steven Universo. Ela é a fusão de Rubi e Safira e a líder das Crystal Gems. Se juntou às Crystal Gems porque elas aceitavam o fato dela ser uma fusão. Lutou na rebelião e se tornou uma das defensoras da Terra. Após a \"morte\" de Rose Quartz, Garnet começou a liderar as Crystal Gems.",
          img: "garnet.png",
          colors: ["#8e24aa", "#6a1b9a"]
        },
        {
          title: "Pérola",
          wiki: "Pérola é uma jóia do tipo pérola de cristal das gemas , em Steven Universo e uma das protagonistas da série. Foi uma primeira jóia de Rose Quartz na Rebelião , tendo um grande amor por ela. Atualmente, é uma das mentoras do seu filho, Steven.",
          img: "pearl.png",
          colors: ["#9e9e9e", "#757575"]
        },
        {
          title: "Ametista",
          wiki: "Ametista, especificamente Ametista Faceta-5 Corte-8XM, é um dos membros das Crystal Gems e uma das protagonistas da série. Ela foi a última Gem conhecida a ser fabricada na Terra como parte do projeto do Jardim de Infância. Após a Rebelião, Ametista se tornou uma Crystal Gem e passou a ajudar seus companheiros a proteger a Terra.",
          img: "amethyst.png",
          colors: ["#673ab7", "#4527a0"]
        },
        {
          title: "Connie Maheswaran",
          wiki: "Connie Maheswaran é uma garota descendente de indianos. Ela é uma espadachim e a melhor amiga de Steven.",
          img: "connie.png",
          colors: ["#673ab7", "#4527a0"]
        },
        {
          title: "Peridot",
          wiki: "Peridot, especificamente Faceta 2F5L Corte 5XG, é uma Gem do tipo peridot da Era-2 que fez sua primeira aparição em \"Transportadores\". Ela se torna oficialmente uma Crystal Gem em \"Mensagem Recebida\", após desobedecer e desafiar uma ordem da Diamante Amarelo. Após isso, ela morou por um tempo com Lapis Lazuli em um celeiro. Mas, após os eventos de \"Levando o Celeiro\", ela começou a morar no banheiro de Steven. Ela mais tarde foi poofada pela Diamante Amarelo em \"Reunidos\"",
          img: "peridot.png",
          colors: ["#4caf50", "#388e3c"]
        },
        {
          title: "Lapis Lazuli",
          wiki: "Lapis Lazuli é uma Gem que teve sua primeira aparição em \"Espelho Gem\". Lapis era uma Gem que ficou presa no espelho após ser confundida com uma rebelde na Rebelião, até ser solta por Steven. Ela volta para o Planeta Natal, mas é forçada a voltar para à Terra com Jasper e Peridot. Depois, ela se funde com Jasper para formar a Malaquita e consegue prendê-la no fundo do oceano. Após isso, ela viveu no Celeiro com uma Peridot completamente diferente, até levar ele consigo para o espaço em \"Levando o Celeiro\". Steven a encontra na Lua em \"Não Posso Voltar\", e a convence voltar para à Terra, mas após ter uma visão das Diamantes, Lapis decide deixar a Lua. Mas, em \"Reunidos\", ela retorna a Terra para ajudar na luta contra as Diamantes, e no processo acaba se tornando uma Crystal Gem. Lapis mais tarde foi poofada pela Diamante Amarelo.",
          img: "lapis_lazuli.png",
          colors: ["#2196F3", "#1565c0"]
        },
        {
          title: "Leão",
          wiki: "Leão é um leão mágico com o qual Steven tenta fazer amizade no episódio \"O Leão do Steven\". Ele é um tipo de protetor de Steven. Como visto em \"Leão 3\" e \"A Espada de Rose\", Leão tem uma conexão com Rose Quartz.",
          img: "leao.png",
          colors: ["#f8bbd0", "#f48fb1"]
        },
        {
          title: "Rubi",
          wiki: "Rubi é uma rubi que teve sua primeira aparição física em \"Libertador\". Rubi é uma Gem forte e corajosa, ela faz de tudo para proteger sua esposa, Safira, e juntas elas podem se transformar em Garnet.",
          img: "rubi.png",
          colors: ["#f44336", "#e53935"]
        },
        {
          title: "Safira",
          wiki: "Safira é uma Gem que faz parte das Crystal Gems. Ela passa a maior parte do tempo fundida com sua parceira romântica, Rubi, sendo a fusão de ambas: Garnet. Ela apareceu fisicamente pela primeira vez no episódio \"Libertador\".",
          img: "safira.png",
          colors: ["#2196F3", "#1e88e5"]
        }
      ];

  var menu = new Menu(namesMenu, js(".content > .menu")),
      page = new Page(js(".content > .wiki"), js(".content > .imageCharacter"));
  menu.onclick = function(k, value){
    console.log(k);
    page.open(pages[k]);
  }
}());