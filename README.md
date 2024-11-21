## Introdução

Esse é um sistema Web para consulta e gerenciamento de consentimento baseado nos requisitos da Lei Geral de Proteção de Dados. 

#### Yarn

Este projeto utiliza o gerenciador de pacotes YARN.
##### Instalacao

Com O NPM
```bash
npm install --global yarn
```

#### Docker

O projeto e seus pacotes utilizam do [Docker](https://www.docker.com/) como base para execucao de todos os processos, logo sua instalacao é essencial. Existem duas principais formas de instalar o Docker:

##### Instalacao

###### Com https://get.docker.com

O script [get.docker](https://get.docker.com) instala docker e configura seu estado no apt-get automaticamente. Para usar esse script faça:

```bash
$ curl https://get.docker.com | bash
```

É importante notar que caso a instalacao não tenha sido feita com o get.docker, upgrade de versões não devem ser feita por ele.

###### Manualmente

Para instalar o docker maualmente siga os passos da [pagina oficial de instalacao](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

###### Pos-instalacao

Apos instalar docker inclua seu usuario ao grudo `docker` para que comandos do docker não precisem usar sudo

```bash
$ sudo usermod -aG docker $USER
```

Para que essa mudança de permissão entre em efeito, saia de sua conta e entre novamente.

Teste sua instalacao:

```bash
# Se o comando a seguir não funcionar, reinicie o seu PC e tente novamente. Se mesmo assim não funcionar, entre em contato com um manteiner do projeto
$ docker run hello-world
```

#### Docker-compose

O [docker-compose](https://docs.docker.com/compose/) permite orquestrar o processo de iniciar e parar varios containers, volumes e redes virtuais

A configuracao do `compose` é feita com um arquivo `docker-compose.yml`. Nesse arquivo são especificados `servicos`, que nada mais sao que containers que devem ser iniciados e terminados de forma coordenada.

Exemplo de arquivo do compose:

```yml
# Versao do compose
version: "3.3"

#Servicos a serem orquestrados
services:
  hello-world:
    # Nome legivel para o container
    container_name: pikachu
    # Qual imagem deve ser utilizada para esse servico
    image: hello-world
    # Redes as quais esse servico pertence
    networks:
      - hello-net
    # Mapping de volumes persistentes e links simbolicos
    volumes:
      # Volume
      - "hello-volume:/app"
      # Link simbolico
      - "./config.js:/app/config.js"

  nginx:
    # Mapping de portas - 80:80 faz o link da porta 80 no seu PC para porta 80 no container
    ports:
      - "80:80"
    volume:
      # Bind mount pratico
      - "./nginx.conf:/etc/nginx/nginx.conf"

# Definicoes de redes
networks:
  hello-net:

# Definicoes de volumes
volumes:
  hello-volume:
```

Esse arquivo pode utilizado pela cli do `compose`:

```bash
# O parametro -f indica que o arquivo a seguir deve ser utilizado pelo compose
# Por default o valor desse arquivo ja é docker-compose.yml
$ docker-compose -f docker-compose.yml up
```

Multiplos arquivos do compose podem ser utilizados sequencialmente, de forma que as configuracoes especificadas em cada arquivo sobrescrevem as dos anteriores. Isso permite definir um `docker-compose.yml` basico seguido de um por ambiente.

Nesse projeto foram definidos multiplos arquivos `docker-compose.yml`, sendo um por ambiente.

Para executar os containers referentes a um ambiente especifico basta fazer:

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.AMBIENTE.yml COMANDO
```

Para evitar repeticao foram criados scripts na raiz do repositorio que ja prefixam esse comando longo a sua operacao, de forma que:

```bash
$ yarn local up
```

tem o mesmo efeito que:

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.local.yml up
```



## Iniciando pacotes


#### Executando localmente

Na maioria dos casos enquanto desenvolve sera necessario iniciar apenas um pacote, pois versoes de desenvolvimento de outros ja estarao disponiveis em seus urls remotos.

Caso venha a ser util executar todo o projeto localmente, siga os passos a seguir:

2 - Execute o comando:

```bash
$ yarn local build
$ yarn local up
```

### Como semear o banco?

```bash
yarn local:seed
```

Caso o commit atual tenha introduzido uma mudanca não retrocompativel ao banco, pode ser necessario remover o volume do `postgres`, garantindo que novas migracoes sejam feitas com um banco virgem.

```bash
$ yarn local down
$ docker volume rm sisenex_db-local
$ yarn local up
```
