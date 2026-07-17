---
author: "SBOMit Maintainers"
title: "Preguntas frecuentes"
translationKey: "faq"
ShowToc: false
---
## ¿Qué es SBOMit?

SBOMit es el nombre del proyecto que gestiona el formato de la especificación SBOMit. Un documento SBOMit es, en esencia, un SBOM, pero con información de verificación adicional que se generó en el momento en que se creó la cadena de suministro. Esta información de verificación, que utiliza certificaciones y plantillas «in toto», puede ser validada por una parte para obtener un alto grado de garantía sobre el software.

## ¿Qué contiene un documento SBOMit y por qué?

Un documento SBOMit es un documento firmado que consta de varios componentes diferentes.  

En primer lugar, contiene una serie de certificaciones «in-toto» que se generaron a medida que se creaba el software descrito. Esto incluye información detallada sobre las diferentes etapas de la cadena de suministro del software, entre las que se incluyen el sistema de control de versiones, el proceso de compilación, las pruebas unitarias, las dependencias utilizadas, el fuzzing, las comprobaciones de cumplimiento de licencias, el empaquetado, etc. Por ejemplo, el sistema de compilación utilizado para compilar el software incluido en la SBOM cuenta con metadatos «in-toto» que incluyen los nombres y los hash seguros de los archivos extraídos del sistema de control de versiones (VCS) para su compilación, los nombres y los hash seguros de los archivos creados durante la compilación, una serie de datos sobre el compilador y una firma generada por una clave privada en poder del compilador.

Esta información de certificación puede utilizarse en coordinación con el segundo punto del documento SBOMit: un esquema «in-toto». El esquema «in-toto» está firmado por el responsable del proyecto y describe cómo deben ser los metadatos de certificación válidos para el proyecto. El esquema especifica las claves privadas de las partes que realizan las certificaciones, así como la forma en que se interrelacionan los pasos.  Por ejemplo, el VCS debe tener una etiqueta Git firmada, sobre la que luego opera el sistema de compilación.  Los archivos compilados por el sistema de compilación deben ser los que se han sometido a las pruebas unitarias, las cuales deben haber superado con éxito.   Es importante destacar que un esquema «in-toto» proporciona una política legible por máquina capaz de validar las certificaciones «in-toto» para garantizar que se han seguido todos esos pasos, en el orden correcto, sobre los elementos adecuados y sin que se haya añadido, omitido ni eliminado nada.

El último elemento que siempre aparece en el documento SBOMit es la información complementaria de la SBOM. Esta información, junto con las certificaciones «in-toto» y el formato «in-toto», puede utilizarse para generar una SBOM real en diversos formatos.  La información complementaria de la SBOM puede incluir datos como el nombre de la empresa u otra información que no se incluya en el proceso «in-toto», pero que sea conveniente incluir en la SBOM resultante.  De este modo, una SBOM generada a partir de un documento SBOMit puede incluir información complementaria que no formaba parte del proceso «in-toto».

También existe una forma de añadir anexos a un documento SBOMit, que se describirá más adelante.

## ¿Qué ventajas tiene un documento SBOMit frente al uso de una herramienta de generación de SBOM que analiza el software?

Las herramientas de análisis, por su propia naturaleza, examinan un programa y tratan de determinar qué ocurrió anteriormente. Por su propia naturaleza, son imperfectas, ya que utilizan información incompleta para intentar reconstruir lo que ocurrió en el pasado. La experiencia práctica ha demostrado que diferentes herramientas de análisis ofrecen resultados muy dispares para un mismo programa.  

Las secciones de certificación «in-toto» de un documento SBOMit se generan en el momento en que el software se procesa a lo largo de la cadena de suministro de software.  Como resultado, esta información será mucho más precisa, ya que las certificaciones «in-toto» recopilan información detallada en el momento en que se crea el producto de software. Esto hace que un documento SBOMit sea, por su propia naturaleza, mucho más preciso.

## ¿Qué ventajas tiene un documento SBOMit frente a la simple firma de una SBOM?

Una SBOM firmada es una declaración firmada por una persona que posee la clave de firma en una organización y en la que se afirma que la SBOM es correcta. Si se roba la clave, o si la persona que firma la SBOM se equivoca respecto a cómo se ha creado el software, la SBOM será incorrecta.

Un documento SBOMit contiene metadatos firmados criptográficamente sobre todos los pasos que se han seguido en la creación del software y describe la política que debe respetarse.  De este modo, resulta mucho más difícil que pasen desapercibidas inexactitudes accidentales —como omitir un paso, lo que históricamente ha sido un problema— o acciones maliciosas.  In-toto también ofrece una mayor capacidad para recuperarse de forma segura tras un ataque y para detectar y contrarrestar las acciones maliciosas de una parte dentro de una organización.

Por poner un ejemplo, una SBOM hoy en día se parece mucho a la lista de ingredientes de un producto.  Sin embargo, en la práctica, esta información suele ser inexacta, podría ser modificada por una parte malintencionada y no se verifica.   Firmar una SBOM ayuda a evitar que sea modificada por una parte malintencionada, de modo que se sabe que la lista de ingredientes que se obtiene ha sido aprobada por una empresa concreta.  Un documento SBOMit también describe con detalle el proceso de fabricación del producto e incluye metadatos y firmas de todas las partes implicadas, incluida la verificación de que las claves utilizadas estaban vigentes en ese momento.  Por lo tanto, en el caso de un documento SBOMit, se tiene un alto grado de garantía de que se han seguido las políticas y procedimientos adecuados.

Para obtener más información sobre este tema, consulta la sección [¿Qué ventajas ofrece in-toto?](https://in-toto.io/in-toto/) en la página web de in-toto.

## ¿Qué pasaría si la cadena de suministro de un software incluyera pasos poco seguros?  

Las certificaciones «in-toto» no sustituyen a la necesidad de contar con medidas de seguridad adecuadas en la cadena de suministro de software. Por ejemplo, si utilizas un proceso inseguro de compilación de software que simplemente descarga y compila el software desde un sitio web, los esquemas «in-toto» pueden indicar esta acción insegura y verificar las certificaciones firmadas que indican que has llevado a cabo dicha acción.  

Por eso, proyectos como SLSA y FRSCA se han diseñado como un conjunto de normas con una visión clara, que se superponen a los pasos de «in-toto». Especifican qué acciones son más importantes para la seguridad de la cadena de suministro de software y exigen la aplicación de determinadas medidas.  

Estos proyectos resuelven diferentes problemas a distintos niveles. In-toto permite recopilar información sobre los pasos que se dan, garantizar que se apliquen las políticas correspondientes, gestionar la confianza en las claves, etc. Marcos como SLSA y FRSCA utilizan In-toto como mecanismo para recopilar y hacer cumplir un conjunto específico de políticas que dan lugar a cadenas de suministro más seguras.  

Se están realizando esfuerzos para que las herramientas automatizadas de SLSA y FRSCA funcionen con diseños «in-toto» y validen el cumplimiento. Cuando estas herramientas alcancen su madurez, podrán integrarse para analizar un documento SBOMit y proporcionar el nivel de puntuación adecuado para la cadena de suministro de software descrita en el mismo.   De este modo, un usuario podrá configurar su sistema para que solo acepte software con un nivel SLSA 4 o superior, que además cuente con un documento SBOMit válido.

## ¿Qué ocurre si es necesario modificar un documento SBOMit con el paso del tiempo? Por ejemplo, para afirmar que no presenta una determinada vulnerabilidad explotable, añadir posteriormente información complementaria que no era necesaria en el momento de su creación, etc.

Un documento SBOMit puede contener una serie de anexos posteriores. Estos se añaden a posteriori y deben ser firmados en última instancia con la clave maestra del documento SBOMit original. Sirven para modificar los distintos campos del documento SBOMit o para añadir información complementaria.  

Utilizar anexos en lugar de crear un nuevo documento SBOMit tiene una ventaja. De este modo, tanto el documento original como los anexos serán verificables y el historial de estos cambios quedará recogido íntegramente en el documento SBOMit. Por lo tanto, los anexos son el modelo recomendado para gestionar los cambios en un documento SBOMit.

## ¿Puedo obtener una SBOM a partir de un documento SBOMit?

¡Sí! Se están desarrollando varias herramientas que permitirán generar una SBOM a partir de un documento SBOMit. Puedes obtener SBOM en diversos formatos utilizando diferentes herramientas.
