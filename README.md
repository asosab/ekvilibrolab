# ekvilibrolab
ekvilibroLAB Laboratorio de fermentos y conservas. Reincorporando alimentos que nos permiten vivir en equilibrio

25/11/2020
Agregado terser para comprimir js, uso:
        npx terser -c -m -o js/main.min.js -- js/main.js

Agregado babel, vigila la carpeta src:
        npx babel --watch src --out-file js/main.js --presets react-app/prod --source-maps
