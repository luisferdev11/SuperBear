# SuperBear
Para quien lo lea

En esta sección hay ideas, mejoras pendientes y corrección de errores.

Escribe apartir de aquí y pon guiones por cada comentario y para tachar utiliza <strike>esta notacion</strike>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

1. Para empezar algo que me molesta un poco al momento de desarrollar es el que te imprima todos los console log y ademas cada vez que inicias sesión te marca un error con los headers creo que el error es en la función auth. Comentario: lo de los console.log se soluciona pero el error no lo se.
 
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

2. Las validaciones no estan implementadas al 100 en el servidor pero las que estan implementadas por java script no tienen la forma correcta de mandarlas a llamar, funcionan pero es un conjunto de malas practicas y creo que el .setAttribute no sirve de nada debido a que los post corresponden con los mismos metodos get.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

3. Quedo pendiente lo de la implementacion de sockets.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

4. Bug visual de nombres de grupo, si es demasiado largo choca con el icono

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

5. Se puede borrar listas sin ser miembro del grupo, editar productos,borrar productos,borrar listas, agregar productos, etc.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

6. Para editar datos te pide la contraseña y para cambiar algun dato a fuerza te pide cambiar la contraseña. Sugiero que se haga otro form para cambiar la contraseña.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

7. Al igual que el punto anterior otra cosa que sucede es que se pueden ver las cosas de los grupos aunque no pertenezcas al grupo.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

8. El error de borrar listas no se pueden si hay productos dentro de ellas en pocas palabras no sirve. Los anteriores son errores y vulnerabilidades importantes pero si se la volo quien hizo esto.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

9. Para lo de autocompletar productos predeterminados he pensado en implementar un buscador con firebase o una tabla que consulte todo y el buscador por DOM. No se que tan dificil sea lo de firebase con mysql pero me lo recomendaron y he visto algunos videos

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.quiten lo de el paso de variable mediante un input html oculto es una mala practica y ni siquiera esta validado

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

11. Apague la app y la bd por que al momento de que una cookie expira te manda a login pero como tiene cookie intenta iniciar pero no es valida entonces se crea un bucle y no funciona, una solucion es borrar las cookies del dispositivo o validar si expiro entonces borrarla o renderizar login

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Animo equipo BearTual
![image](https://user-images.githubusercontent.com/65563395/145501935-848250bb-c7ee-4b15-85e8-81de79a651b4.png)
