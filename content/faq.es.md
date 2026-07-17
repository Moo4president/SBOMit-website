---
author: "SBOMit Maintainers"
title: "Preguntas frecuentes"
translationKey: "faq"
ShowToc: false
---
## ¿Qué es «SBOMit»?

SBOMit Es el nombre del proyecto que gestiona el formato de especificación «SBOMit». Un documento «SBOMit» es, en la práctica, un «SBOM», pero con información de verificación adicional que se generó en el momento en que se creó la cadena de suministro. Esta información de verificación, que utiliza in-toto, attestations y layouts, puede ser validada por una parte para obtener un alto grado de garantía sobre el software.

## ¿Qué contiene un documento «SBOMit» y por qué?

Un documento «SBOMit» es un documento firmado que consta de varios componentes diferentes.  

En primer lugar, contiene una serie de archivos in-toto attestations que se generaron durante el desarrollo del software descrito. Esto incluye información detallada sobre las diferentes etapas de la cadena de suministro del software, como el sistema de control de versiones, el proceso de compilación, las pruebas unitarias, las dependencias utilizadas, el fuzzing, las comprobaciones de cumplimiento de licencias, el empaquetado, etc.  Por ejemplo, el sistema de compilación utilizado para compilar el software en SBOM cuenta con in-toto metadata, donde figuran los nombres y los hash seguros de los archivos extraídos del sistema de control de versiones (VCS) para su compilación, los nombres y los hash seguros de los archivos creados durante la compilación, una serie de datos sobre el compilador y una firma generada por una clave privada en poder del compilador.

Esta información attestation puede utilizarse en coordinación con el segundo punto del documento SBOMit: un in-toto layout. El in-toto layout está firmado por el responsable del proyecto y describe cómo debe ser una attestation metadata válida para el proyecto. El layout especifica las claves privadas de las partes que llevan a cabo el attestations, así como la forma en que se interconectan los pasos.  Por ejemplo, el VCS debe tener una etiqueta git firmada, sobre la que luego opera el sistema de compilación.  Los archivos compilados por el sistema de compilación deben ser los que se han sometido a las pruebas unitarias, las cuales deben haber superado con éxito.   Es importante destacar que un «in-toto» (layout) proporciona una política legible por máquina que puede validar el «in-toto» (attestations) para garantizar que se han seguido todos esos pasos, en el orden correcto, sobre los elementos adecuados y sin que se haya añadido, omitido ni eliminado nada.

El elemento final que siempre aparece en el documento SBOMit es la información complementaria SBOM. Esta información, junto con in-toto, attestations y in-toto, layout, puede utilizarse para generar un SBOM real en diversos formatos. La información complementaria SBOM puede incluir datos como el nombre de la empresa u otra información que no figura en in-toto, pero que es conveniente incluir en el SBOM resultante.  De este modo, un documento SBOM generado a partir de un documento SBOMit puede incluir información complementaria que no formaba parte del proceso in-toto.

También existe una forma de añadir un archivo «addendums» a un documento «SBOMit», que se describirá más adelante.

## ¿Cuáles son las ventajas de un documento «SBOMit» frente al uso de una herramienta de generación «SBOM» que analiza el software?

Las herramientas de análisis, por su propia naturaleza, examinan un programa y tratan de determinar qué ocurrió anteriormente. Por su propia naturaleza, son imperfectas, ya que utilizan información incompleta para intentar reconstruir lo que ocurrió en el pasado. La experiencia práctica ha demostrado que diferentes herramientas de análisis ofrecen resultados muy dispares para un mismo programa.  

Las secciones «in-toto» (

## ¿Cuáles son las ventajas de un documento «SBOMit» frente a la simple firma de un «SBOM»?

Un «SBOM» firmado es una declaración firmada por una persona que posee la clave de firma de una organización y en la que se afirma que el «SBOM» es correcto. Si la clave es objeto de un robo, o si la parte que firma el «SBOM» se equivoca respecto a cómo se ha creado el software, entonces el «SBOM» será incorrecto.

Un documento «SBOMit» contiene información metadata firmada criptográficamente sobre todos los pasos que se han seguido para crear el software y describe la política que debe respetarse.  Es mucho más difícil que pasen desapercibidas imprecisiones accidentales, como saltarse un paso (lo cual ha sido un problema habitual), o que se produzcan acciones maliciosas.  in-toto también ofrece una mayor capacidad para recuperarse de forma segura tras un ataque y para detectar y contrarrestar las acciones maliciosas de una parte dentro de una organización.

Por poner un ejemplo, un certificado de autenticación (SBOM) hoy en día se parece mucho a la lista de ingredientes que aparece en un producto. Sin embargo, en la práctica, esta información suele ser inexacta, podría ser modificada por alguien malintencionado y no está verificada. Firmar un certificado de autenticación (SBOM) ayuda a evitar que sea modificado por alguien malintencionado, de modo que sabes que la lista de ingredientes que recibes ha sido aprobada por una empresa concreta.  Un documento de «SBOMit» (Declaración de conformidad) también describe con detalle el proceso de fabricación del producto e incluye «metadata» y las firmas de todas las partes implicadas, incluida la verificación de que las claves utilizadas estaban vigentes en ese momento.  Por lo tanto, en el caso de un documento de «SBOMit», se tiene un alto grado de garantía de que se han seguido las políticas y procedimientos adecuados.

Para obtener más información sobre este tema, consulta la sección [¿Qué ventajas ofrece in-toto?](https://in-toto.io/in-toto/) en la página web in-toto.

## ¿Qué pasaría si la cadena de suministro de un software incluyera pasos poco seguros?  

in-toto attestations no sustituyen a la implementación de medidas de seguridad adecuadas en la cadena de suministro de software. Por ejemplo, si utilizas un proceso inseguro de compilación de software que simplemente descarga y compila el software desde un sitio web, in-toto y layouts pueden registrar esta acción insegura y verificar el archivo firmado attestations, lo que indica que has realizado dicha acción insegura.  

Por eso, proyectos como SLSA y FRSCA se han diseñado como un conjunto de normas con un enfoque concreto que se suman a los pasos descritos en in-toto. En ellos se especifican qué medidas son más importantes para la seguridad de la cadena de suministro de software y se exigen determinadas acciones.  

Estos proyectos resuelven diferentes problemas a distintos niveles.  in-toto permite registrar información sobre tus pasos, garantizar que se apliquen las políticas correspondientes, gestionar la confianza en las claves, etc.  Marcos como SLSA y FRSCA utilizan in-toto como mecanismo para registrar y hacer cumplir un conjunto específico de políticas que dan lugar a cadenas de suministro más seguras.  

Se están realizando esfuerzos para que las herramientas automatizadas de SLSA y FRSCA funcionen con in-toto y layouts, y validen el cumplimiento de los requisitos. Cuando estas herramientas alcancen la madurez, podrán integrarse para analizar un documento de SBOMit y proporcionar el nivel de puntuación adecuado para la cadena de suministro de software descrita en él. De este modo, un usuario podrá configurar su sistema para que solo acepte software de SLSA de nivel 4 o superior, que además cuente con un documento válido de SBOMit.

## ¿Qué ocurre si es necesario modificar un documento de «SBOMit» con el paso del tiempo? Por ejemplo, para afirmar que no presenta una determinada vulnerabilidad explotable, o para añadir posteriormente información complementaria que no era necesaria en el momento de su creación, etc.

Un documento SBOMit puede contener una serie de «addendums» a posteriori. Estos se añaden con posterioridad y deben ser firmados en última instancia por la clave maestra del documento original SBOMit. Sirven para modificar los distintos campos del documento SBOMit o para añadir información complementaria.  

Utilizar addendums en lugar de crear un nuevo documento SBOMit tiene una ventaja. De esta forma, tanto el documento original como cualquier addendums serán verificables y el historial de estos cambios quedará recogido íntegramente en el documento SBOMit. Por lo tanto, addendums es el modelo recomendado para gestionar los cambios en un documento SBOMit.

## ¿Puedo obtener un documento «SBOM» a partir de un documento «SBOMit»?

¡Sí! Se están desarrollando varias herramientas que permitirán obtener un documento «SBOM» a partir de un documento «SBOMit». Puedes obtener un documento «SBOMs» en diversos formatos utilizando diferentes herramientas.
