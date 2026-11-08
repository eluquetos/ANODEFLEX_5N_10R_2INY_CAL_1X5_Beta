# ANODEFLEX_5N_10R_2INY_CAL_1X5_Beta

Aplicación Beta para calibrar 10 ramas en 5 nodos mediante tensiones de fuente y de nodo y corrientes medidas con los reóstatos en 0 Ω. Las tensiones deben medirse respecto a una misma referencia.

La medición A comprende los nodos 1 a 3. La medición B comprende los nodos 4 a 5. Cada Rc es la caída de tensión en el tramo dividida por la corriente de ese tramo. Cada resistencia fija es la tensión del nodo dividida por la corriente de la rama. Se rechazan tensiones crecientes aguas abajo.

Una sola fuente alimenta los 5 nodos en regulación. La resistencia Rc4 medida entre la fuente B y el nodo 4 se utiliza entre los nodos 3 y 4; verifique que corresponda al cable reconectado. El voltaje de trabajo es independiente de los voltajes de medición. La aplicación permite ajustar los reóstatos, exportar e importar casos e imprimir resultados.

Ejecute `node tests/model.test.js`, `node tests/static.test.js` y `node tests/app.test.js`.

En regulación, ingrese una corriente común y pulse «Aplicar a las 10 ramas». Después puede cambiar cada objetivo individualmente. El ajuste asistido calcula la tensión mínima y reemplaza los valores de los reóstatos.
