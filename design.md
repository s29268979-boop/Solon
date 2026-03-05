# Diseño de Interfaz Móvil - Solón

## Visión General
Solón es una aplicación de búsqueda de ofertas laborales con dos modos de búsqueda: criterios específicos y búsqueda por mapa. La estética es oscura y dorada, inspirada en el "Portal de Sólon" con un diseño elegante y profesional.

## Paleta de Colores
- **Fondo Principal**: Negro oscuro (#0F0F0F)
- **Fondo Secundario**: Gris oscuro (#1A1A1A)
- **Dorado Primario**: #D4AF37 (dorado clásico)
- **Dorado Secundario**: #C9A961 (dorado más suave)
- **Texto Principal**: Blanco (#FFFFFF)
- **Texto Secundario**: Gris claro (#CCCCCC)
- **Borde**: Gris muy oscuro (#333333)
- **Acento**: Dorado (#D4AF37)

## Lista de Pantallas

### 1. **Pantalla de Inicio (Portal de Sólon)**
- Ícono dorado de llave en círculo
- Título: "PORTAL DE SÓLON"
- Subtítulo: "Selecciona tu modo de búsqueda"
- Dos botones principales:
  - "Búsqueda Específica" (dorado)
  - "Búsqueda por Mapa" (dorado con borde)
- Fondo oscuro con degradado sutil

### 2. **Pantalla de Búsqueda Específica**
- Campos de entrada:
  - Edad (número)
  - Sexo (selector: Hombre/Mujer)
  - Experiencia laboral (textarea o lista de tags)
  - Ciudad (texto)
  - Estado (texto)
  - País (texto)
- Botón "Buscar" (dorado)
- Botón "Limpiar" (secundario)
- Validación estricta de ubicación

### 3. **Pantalla de Búsqueda por Mapa**
- Mapa interactivo centrado en ubicación actual
- Botón de permisos de ubicación (si es necesario)
- Filtro temporal: solo ofertas de últimas 3 semanas
- Lista de ofertas dentro del área visible
- Botón flotante para refrescar

### 4. **Pantalla de Resultados**
- Lista de ofertas filtradas
- Cada oferta muestra:
  - Título del puesto
  - Empresa
  - Ubicación
  - Fecha de publicación
  - Edad requerida (si aplica)
  - Sexo requerido (si aplica)
  - Experiencia requerida
- Botón "Ver Detalles" para cada oferta

### 5. **Pantalla de Detalles de Oferta**
- Información completa de la oferta
- Descripción del puesto
- Requisitos detallados
- Datos de contacto
- Botones: "Aplicar", "Compartir", "Volver"

### 6. **Pantalla de Configuración**
- Tema (oscuro/claro)
- Idioma
- Notificaciones
- Acerca de

## Flujos de Usuario Principales

### Flujo 1: Búsqueda Específica
1. Usuario toca "Búsqueda Específica" en inicio
2. Ingresa criterios (edad, sexo, experiencia, ubicación)
3. Toca "Buscar"
4. Sistema valida ubicación exacta
5. Filtra por fecha (< 3 semanas)
6. Filtra por género y edad si especifica
7. Filtra por experiencia correlacionada
8. Muestra resultados
9. Usuario selecciona oferta para ver detalles

### Flujo 2: Búsqueda por Mapa
1. Usuario toca "Búsqueda por Mapa" en inicio
2. App solicita permisos de ubicación
3. Mapa se centra en ubicación actual
4. Extrae todas las ofertas del área visible
5. Filtra solo por fecha (< 3 semanas)
6. Muestra ofertas en el mapa
7. Usuario selecciona oferta para ver detalles

## Componentes Clave

### Componente: Card de Oferta
- Fondo: Gris oscuro (#1A1A1A)
- Borde: Dorado sutil
- Título: Blanco, bold
- Subtítulo: Gris claro
- Icono de ubicación: Dorado
- Fecha: Gris muy claro

### Componente: Botón Primario
- Fondo: Dorado (#D4AF37)
- Texto: Negro oscuro
- Borde redondeado: 12px
- Padding: 16px vertical, 24px horizontal
- Estado presionado: Escala 0.97

### Componente: Botón Secundario
- Fondo: Transparente
- Borde: Dorado 2px
- Texto: Dorado
- Borde redondeado: 12px

### Componente: Input
- Fondo: Gris oscuro (#1A1A1A)
- Borde: Gris (#333333)
- Texto: Blanco
- Placeholder: Gris claro
- Borde redondeado: 8px

## Consideraciones de Diseño

- **Orientación**: Portrait (9:16)
- **Uso con una mano**: Botones principales en la mitad inferior
- **Accesibilidad**: Contraste suficiente entre dorado y negro
- **Consistencia**: Usar el mismo sistema de colores en todas las pantallas
- **Espaciado**: 16px como unidad base
- **Tipografía**: Sans-serif moderno (Segoe UI, -apple-system)

## Animaciones Sutiles

- Transición entre pantallas: fade (200ms)
- Presión de botones: scale 0.97 (80ms)
- Carga de resultados: fade-in (300ms)
- Haptic feedback en acciones principales

