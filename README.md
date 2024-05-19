# Coordinadora Shopify

# Tabla de contenido
- [Tienda](#tienda)
- [Objetivo](#objetivo)
- [Especificaciones](#especificaciones)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Entregables](#entregables)
- [Criterios de Evaluación](#criterios-de-evaluación)
- [Instalacion](#instalacion)

# Tienda
[Ver demo carrito de compras](https://coordinadora-test.myshopify.com/cart) Debe agregar al menos un producto al carrito para visualizar el carrito de compras.

## Objetivo
Desarrollar un widget de carrito de compras que pueda ser integrado en Shopify.

## Especificaciones
- El widget debe mostrar los artículos agregados al carrito, el subtotal y botones para modificar cantidades o eliminar artículos.
- Debe ser responsivo y estilizado adecuadamente para adaptarse a diferentes temas de sitios web.
- El backend puede ser simulado con datos a partir de un json, no es necesario una base de datos real

## Requisitos Técnicos
- Escribe el código necesario para un plugin simple que pueda ser instalado en Shopify. Utiliza PHP para manejar la lógica del servidor.

## Entregables
- Código fuente del plugin.
- Instrucciones breves de instalación y configuración.
- Una breve explicación de cómo el código se adapta y funciona dentro de las plataformas Shopify.

## Criterios de Evaluación
- Calidad del Código: Claridad, mantenibilidad, uso de buenas prácticas.
- Funcionalidad: Cumplimiento de los requisitos y especificaciones dados.
- Creatividad y Solución de Problemas: Eficiencia en las soluciones implementadas y enfoque innovador en la resolución de problemas.
- Documentación y Explicaciones: Claridad en la documentación y en las explicaciones del código y de la integración.

# Instalacion

1. Editar el codigo del tema de la tienda mas informacion en [aqui. Editar código de tema](https://help.shopify.com/es/manual/online-store/themes/theme-structure/extend/edit-theme-code)

2. Segun el tema que se esté utilizando, se debe agregar el siguiente codigo en el archivo `theme.liquid` en la
   carpeta `layout` del tema. En la seccion `head` agregar el siguiente codigo:
    ```liquid
    {%- if template == 'cart' or template == 'cart.json' -%}
        <link rel="stylesheet" href="{{ 'cart-widget.css' | asset_url }}">
        <script src="{{ 'cart-widget.js' | asset_url }}" defer="defer"></script>
    {%- endif -%}
    ```
3. Crear el archivo [`main-cart-widget.liquid`](Sections/main-cart-widget.liquid) en la carpeta `Sections`
   o `Secciones` segun corresponda el idioma.
4. Crear el archivo [`cart-widget.liquid`](Snippets/cart-widget.liquid) en `Snippets` o `Fragmentos` segun corresponda
   el idioma.
5. Segun el tema que esté configurado, modificar el archivo `cart.json` o `cart.liquid` segun corresponda la existencia
   de estos
   archivos en el tema en la carpeta `Templates` o `Plantillas` segun el idioma. Es decir si existe `cart.json`
   reemplazar el contenido por el archivo que se encuentra en este
   repositorio [`Templates/cart.json`](Templates/cart.json) y si existe `cart.liquid` reemplazar el contenido por el
   archivo que se encuentra en
   este repositorio [`Templates/cart.liquid`](Templates/cart.liquid).
6. Crear los archivos [cart-widget.css](Assets/cart-widget.css) y [cart-widget.js](Assets/cart-widget.js) en la carpeta `Assets` o `Recursos` segun corresponda el idioma.
