# ANODEFLEX_5N_10R_2INY_CAL_1X5__v1.0.0

Aplicación para calibrar diez ramas mediante dos mediciones de campo independientes y regularlas con una sola inyección.

## Mediciones de campo

Con todos los reóstatos en 0 Ω, el lado A se mide con VA → Rc1 → nodo 1 → Rc2 → nodo 2 → Rc3 → nodo 3. El lado B se mide con VB → Rc4 → nodo 4 → Rc5 → nodo 5. Cada nodo tiene dos ramas. Cada tramo de cable lleva únicamente la corriente de sus ramas aguas abajo dentro de su medición.

## Regulación

Para regular, conecte Rc4 entre los nodos 3 y 4: una fuente alimenta en serie Rc1 a Rc5 desde el nodo 1. El voltaje de trabajo es independiente de VA y VB. El ajuste asistido calcula el voltaje mínimo y los reóstatos para las diez corrientes objetivo; si supera el máximo configurado, indica que el ajuste no es viable. También se pueden modificar el voltaje y los reóstatos manualmente.

La aplicación permite exportar e importar casos JSON e imprimir informes. GitHub Pages sirve la carpeta `docs`.

## Pruebas

Ejecute `node tests/model.test.js` y `node tests/static.test.js`.
