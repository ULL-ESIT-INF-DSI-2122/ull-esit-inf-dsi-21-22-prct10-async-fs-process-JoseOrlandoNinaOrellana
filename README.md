# Informe Práctica 10 DSI

## Ejercicio 1

El método `access` de `fs` se usa para comprobar los permisos de un archivo o directorio. Tiene como parámetros una ruta, un modo y un callback. El modo puede tener como valor `constants.F_OK`, `constants.R_OK`, `constants.W_OK` y `constants.X_OK`. El valor predeterminado es `constants.F_OK`.

| Constant |                      Descripción                      |
|:--------:|:-----------------------------------------------------:|
|   F_OK   |        Flag que comprueba si un fichero existe        |
|   R_OK   |    Flag que comprueba si el fichero puede ser leído   |
|   W_OK   | Flag que comprueba si se puede escribir en el fichero |
|   X_OK   |  Flag que comprueba si el fichero puede ser ejecutado |

## Ejercicio 2

### Con pipe

Crearemos un comando con `yargs` llamado countWords que tendrá como parámetros obligatorios el nombre del fichero y la palabra.

Comprobaremos con el `access` si el fichero existe pasando como parámetro el ubicación del fichero y con la constante `F_OK`. En caso de erro lanzaremos un mensaje por patalla. En caso contrario crearemos los procesos con el `spawn`. El primero será el proceso `cat` que  tendrá como parámetro el nombre del fichero. El segundo será el proceso `grep` que tendrá como parámetro la palabra a contar. Con `pipe` conectaremos la salida del `cat` con la entrada del `grep`.

![](https://gyazo.com/41f7d010af22a17c10f4818dc7015a89.png)

### Sin pipe

Sin pipe es igual que al anterior solo que en vez de crear dos procesos solo crearemos uno, `grep`, y a este le pasaremos como parámetros el la parlabra y el nombre del fichero.

![](https://gyazo.com/b7fcb6b57350150dbeee14d5544507c5.png)

## Ejercicio 3

Crearemos una clase llamada `WatcherNotes` que tendrá dos métodos. El primer método `watchFolderUser` que tendrá como parámetro la ruta del directorio del usuario. Usaremos `watch` que tiene como parámetros la ruta y el `listener`. El `listener` tiene el tipo de evento y el nombre del archivo que dessecandena el evento. Hay dos tipos de eventos: `rename` y `change`.

Si el tipo de evento es `rename` signfica que se ha creado o borrado un nota. Compobramos si el fichero existe, si es así significa que se ha creado un nueva nota. Mostramos un mensaje indicando que se ha creado una nueva nota. En caso de que no exista la nota significa que se ha borrado esa nota. Si el tipo de evento es `change` significa que una nota se ha editado.

El segundo método `viewFile` recibe como parámetro la ruta de la nota. Esta función crea un proceso `cat` que lee el contenido de la nota y lo muestra por pantalla. Se llamará a esta función cada vez que se modifique una nota o se crea una nueva nota.

![](https://gyazo.com/fab718aa28e522562c8c53c4b23f224f.png)

Para poder observar todos los directorios de los usuarios lo que podríamos hacer es utilizar `watch`, pero esta vez especificando la ruta donde estan todas las carpetas de los usuarios y activando un opción `recursive` que permite observar subdirectorios.

## Ejercicio 4

Desarrolle una aplicación que permita hacer de wrapper de los distintos comandos empleados en Linux para el manejo de ficheros y directorios.

### Check

Crearemos un comando con `yargs` llamado `check` que tiene como parámetro una ruta, `path`, que será obligatoria y de tipo `string`. Este comando nos dirá si la ruta es un directorio o un archivo.

El método `lstat` de `fs` nos permite ver información sobre un enlace simbólico que hace referencia a un archivo o directorio. Esta función tendrá como parámetros la ruta y un callback. El callback contendría un `err` y un objeto `Stats` que contiene los detalles de la ruta del archivo.

El objeto `Stats` tiene una función `isFile` que comprueba si es un fichero yla función `isDirectory` que comprueba que es un directorio.

Usaremos entonces el método `lstat` y le pasaremos la ruta recibida por línea de comando, comprobaremos si existe algún error, y luego comprobaremos con la funciones `isFile` y `isDirectory` para saber si es un archivo o un directorio.

### makeDirectory

Crearemos un comando con `yargs` llamado `makeDirectory` que tiene como parámetro una ruta, `path`, que será obligatoria y de tipo `string`. Este comando creará un nuevo directorio. Con el método `mkdir` de `fs` crearemos el directorio pasandole como parámetro la ruta recibida por línea de comando. Comprobaremos si existe un error, si existe retornaremos el mensaje de error, en caso contrario mostraremos un mensaje indicando que se ha creado el directorio.

### listFiles

Crearemos un comando con `yargs` llamado `listFiles` que tiene como parámetro la ruta del directorio, `path`, que será obligatorio y de tipo `string`. Primero comprobaremos con la función `isDirectory` de `lstatSync` si la ruta dada es un directorio. Si no es un directorio mostraremos un mensaje indicando el error. En caso contrario usaremos `readdir` que se utiliza para leer el contenido de un directorio determinado. La función `readdir` tiene como parámetros la ruta del directorio y un callback. El callback contiene `err` y `files`, este último sería un array de strings de los nombres de los ficheros que contiene el directorio. Por lo que usaremos un `forEach` para recorrer `files` y mostrarlos por pantalla.

### read

Crearemos un comando con `yargs` llamado `read` que tiene como parámetro la ruta del archivo que queremos leer. Usaremos la función `readFile` para leer el contenido del archivo. La función tiene como parámetros la ruta del archivo, una opción para la codificación del archivos y un callback. El callback tiene un `err` y la `data` que tiene el contenido del archivo. Comprobaremos si existe algún error, si hay algun error devolvemos el mensaje de error, en caso contrario mostramos el contenido del archivo.

### remove

Crearemos un comando con `yargs` llamado `remove` que tiene como parámetro la ruta del directorio o el archivo que queremos borrar. Usaremos la función `rm` de `fs` que tiene como parámetros la ruta del directorio o archivo, las opciones y un callback. Le pasaremos a la función la ruta recibida por línea de comando, pondremos como opción `recursive` igual a `true` para poder borrar directorios y su contenido, y un callback indicando un error si es que se produce o un mensaje indicando que se ha borrado correctamente.
