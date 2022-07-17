[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7748562&assignment_repo_type=AssignmentRepo)

# Atividade 1 - Visita Guiada Virtual - Breno Leonardo


Eu usei o FirstPersonControls para a câmera, me movimentando com W A S D ou nas setas e alterando minha visão com o mouse.

No modo andando eu defini uma position.y fixa para não ser possivel voar nem afundar, setei os limites do castelo utilizando 10% a menos do limite para que não passasse da ultima parede e pudesse ver o fundo preto.

No modo drone eu retirei a limitação da position.y e setei os limites minimo e maximo dela de acordo com o castelo, eu aumentei o movementSpeed e lookSpeed para ficar mais parecido com a rapidez de um drone.

No modo visita guiada defini 4 locais, o usuario controla quando quer continuar a viagem atraves do menu, ao parar em algum local a câmera é liberada para olhar ao redor. Me limitei a parte inferior já que não podia passar por dentro de objetos neste modo. Para locomover usei como base o ponto (0,0,0) e o tamanho da box.




# Atividade 1 - Visita Guiada Virtual - Explicações

## Contexto

Um dos modelos mais utilizados na avaliação de algoritmos de iluminação global é o [átrio do Palácio de Sponza, na Croácia](https://en.wikipedia.org/wiki/Sponza_Palace). O modelo 3D foi criado em 2002 por [Marko Dabrovic](https://www.archilovers.com/marko-dabrovi%C3%A6/), e desde então tem recebido ajustes e modificações para testar a capacidade gráfica dos algoritmos de renderização, como a remodelagem feita por [Frank Meinl](https://www.artstation.com/digitalwerk), na época na [Crytek](https://www.crytek.com/), a padronização feita por [Morgan McGuire](https://casual-effects.com/g3d/data10/common/model/crytek_sponza/sponza.zip) e mais recentemente a elevação da qualidade visual feita pelo grupo da [Intel](https://www.intel.com/content/www/us/en/newsroom/opinion/intel-graphics-step-up-research.html), liderado por [Anton Kaplanyan](http://kaplanyan.com/).

## Objetivo:

O objetivo da atividade é construir uma aplicação em [Three.JS](https://threejs.org/) que permita fazer um passeio virtual nesse modelo. Para tanto voces devem fornecer ao usuário 3 modalidades de percurso:

1. **Modo "Andando a pé"**: O usuário poderá andar pelo modelo como uma pessoa o faria no modelo real;

1. **Modo "Drone"**: Simular os graus de liberdade de um drone se movendo pelo espaço do modelo[^1];

1. **Modo "Visita Guiada"**: Nesse modo um caminho pré-definido deve ser fornecido, levando o usuário a pelo menos 4 pontos relevantes do modelo.

Voce pode utiliziar qualquer um dos [*controlers*](https://threejs.org/docs/index.html?q=control) disponíveis no *Three.JS*. No entanto, esses *controlers* devem ser customizados, de tal forma que permitam a real sensação de uma visita a pé, um sobrevoo ou uma visita guidada automática. Em outras palavras, questões como escala, velocidade do movimento e tipo de controle disponível devem ser levadas em conta. 

## Requisitos:

- Como o modelo não contempla a parte externa do átrio do palácio, os passeios devem ser restritos aos limites do modelo;
- Considere a questão da escala ao configurar o movimento nos passeios, de modo a garantir uma sensação de estar mesmo dentro do espaço real;
- No modo **"visita guiada"** o usuário deverá ter um avatar como "guia" para conduzi-lo ao longo do percurso. O avatar deverá ser um modelo articulado e animado[^2] que irá à frente do usuário durante o percurso.  

## Entrega e Critérios de Avaliação:

O trabalho será submetido individualmente através do repositório disponibilizado pelo professor, via GitHub Classroom, para essa atividade. 
> **Não serão consideradas versões enviadas por e-mail, Google Classroom, Discord, ou outros meios.**

O trabalho será avaliado a partir dos seguintes critérios:

| Critério | Pontuação |
| :--- | :---: |
| 1. Documentação (README) | 0,5 |
| 2. Configuração do cenário | 0,5 | 
| 3. Modo "Andando à Pé" | 2,0 |
| 4. Modo "Drone" | 2,0 |
| 5. Modo "Visita Guiada" |  |
| - Movimentação | 2,0 |
| - Avatar do "guia" | 1,5 |
| 6. Confinamento dos movimentos ao modelo | 1,5 |

## Penalidades:              

> Será aplicada a penalização de -1,0 pto por dia de atraso (verificado via data da ultima submissão no repositório)
> 
>> **Em casos de plágio (total ou parcial) todos os envolvidos terão suas avaliações zeradas**. 

## Referências:

[1] Peter SHIRLEY, Michael ASHIKHMIN, Steve MARSCHNER. **Fundamentals of Computer Graphics**. AK Peters/CRC Press, 5th Edition, 2021.

[2] John F. Hughes, Andries van Dam, Morgan McGuire, David F. Sklar, James D. Foley, Steven K. Feiner. **Computer Graphics : Principles and 
Practice Third Edition in C**. Addison-Weslley. 2013.

[3] DIRKSEN, Jos. **Learn Three. js: Programming 3D animations and visualizations for the web with HTML5 and WebGL**. Packt Publishing Ltd, 2018.

[^1]: a colisão entre os elementos do espaço, como colunas, cortinas, etc, podem ser desconsideradas nesse caso. 
[^2]: nos exemplos do *Three.JS* voce pode encontrar alguns modelos desse tipo. Mas se quiser pode escolher outros em sites especializados como o [*SketchFab*](https://sketchfab.com/) fica a seu critério.
