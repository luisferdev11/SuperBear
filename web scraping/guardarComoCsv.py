# Importar pandas pa que sea mas facil
import pandas
# Aqui ponemos todo el contenido que nos dio el script de js
contenidoJS = "todo, tu, contenido"
# Separa la variable en un array usando la ","
# como referencia
separado = contenidoJS.split(",");
# Imprime el array en la consola
print(separado)
# Convierte el array en un data frame
df = pandas.DataFrame(separado, columns = ['marca'])
# Guarda el data frame como un csv llamado "dataset.csv"
df.to_csv('dataset.csv')