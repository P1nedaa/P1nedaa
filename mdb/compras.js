const { MongoClient } = require('mongodb');

const faker = require('faker');

const url = 'mongodb+srv://juanpineda:1@cluster0.gvnh0n1.mongodb.net/?retryWrites=true&w=majority';

async function crearColeccion() {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const db = cliente.db('BabySoft');
    await db.createCollection("Compras", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            title: "Compras Object Validation",
            required: [ "CodigoCompra", "IdReferencia", "IdUsuario", "Cantidad" ,"Fecha" ],
            properties: {
               CodigoCompra: {
                  bsonType: "int",
                  description: "'CodigoCompra' debe ser int-entero"
               },
               IdReferencia: {
                  bsonType: "int",
                  description: "'IdReferencia' debe ser int-entero"
               },
               IdUsuario: {
                  bsonType: "int",
                  description: "'IdUsuario' debe ser int-entero"
               },
               Cantidad: {
                  bsonType: "int",
                  description: "'Cantidad' debe ser int-entero"
               },
               Fecha: {
                  bsonType: "date",
                  description: "'Fecha' debe ser una fecha válida"
               }
            }
         }
      }
   } )
    console.log('Colección creada exitosamente');
  } catch (error) {
    console.error('Error al crear la colección:', error);
  } finally {
    cliente.close();
  }
}

// crearColeccion();


async function insertarDocumentos() {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const comprasCollection = db.collection('Compras');
      const documentos = [];
  
      for (let i = 0; i < 2000; i++) {
        const compra = {
          CodigoCompra: faker.random.number(),
          IdReferencia: faker.random.number(),
          IdUsuario: faker.random.number(),
          Cantidad: faker.random.number(),
          Fecha: faker.date.past()
        };
        documentos.push(compra);
      }
  
      await comprasCollection.insertMany(documentos);
      console.log('Documentos insertados exitosamente');
    } catch (error) {
      console.error('Error al insertar los documentos:', error);
    } finally {
      cliente.close();
    }
}
  
insertarDocumentos();

async function insertarCompra(nuevaCompra){

  const cliente = new MongoClient(url)

  try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection("Compras").insertOne(nuevaCompra);
      console.log(`Se creo una nueva compra con el siguiente id: ${result.insertedId}`);
      console.log(nuevaCompra);
  } catch (e) {
      console.log(e)
  }finally{
      cliente.close()
  }
}

// insertarCompra({
//   CodigoCompra: 1,
//   IdReferencia: 13,
//   IdUsuario: 1,
//   Cantidad: 7,
//   Fecha: new Date()
// });



async function insertarCompras(compras) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .insertMany(compras);
      console.log('Se insertaron los siguientes documentos:');
      console.log(result.insertedIds);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}


// insertarCompras([
//     {
//       CodigoCompra: 2,
//       IdReferencia: 14,
//       IdUsuario: 2,
//       Cantidad: 5,
//       Fecha: new Date()
//     },
//     {
//       CodigoCompra: 3,
//       IdReferencia: 15,
//       IdUsuario: 1,
//       Cantidad: 3,
//       Fecha: new Date()
//     }
// ]);

async function buscarCompras() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const compras = await cliente
        .db('BabySoft')
        .collection('Compras')
        .find()
        .toArray();
      console.log('Los documentos encontrados son:');
      console.log(compras);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}

// buscarCompras();

async function buscarCompraPorCodigo(codigo) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const compra = await cliente
        .db('BabySoft')
        .collection('Compras')
        .findOne({ CodigoCompra: codigo });
      console.log('El documento encontrado es:');
      console.log(compra);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// buscarCompraPorCodigo(1);

async function actualizarCompra(codigo, nuevasPropiedades) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .updateOne({ CodigoCompra: codigo }, { $set: nuevasPropiedades });
      console.log(`Se actualizó el documento con el código ${codigo}`);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// actualizarCompra(1, { Cantidad: 10 });



async function actualizarComprasPorUsuario(usuario, nuevasPropiedades) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .updateMany({ IdUsuario: usuario }, { $set: nuevasPropiedades });
      console.log(`Se actualizaron los documentos del usuario ${usuario}`);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// actualizarComprasPorUsuario(1, { Cantidad: 0 });

async function eliminarCompraPorCodigo(codigo) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .deleteOne({ CodigoCompra: codigo });
      console.log(`Se eliminó el documento con el código ${codigo}`);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// eliminarCompraPorCodigo(1);

async function eliminarComprasPorUsuario(usuario) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .deleteMany({ IdUsuario: usuario });
      console.log(`Se eliminaron los documentos del usuario ${usuario}`);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// eliminarComprasPorUsuario(1);

async function eliminarColeccion() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .drop();
      console.log('Se eliminó la colección "Compras"');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// eliminarColeccion();

async function eliminarBaseDeDatos() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .dropDatabase();
      console.log('Se eliminó la base de datos "BabySoft"');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// eliminarBaseDeDatos();

// Ejemplo 1: Realizar un $lookup entre las colecciones "Compras" y "Usuarios" por el campo "IdUsuario"
async function realizarLookup() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .aggregate([
          {
            $lookup: {
              from: 'Usuarios',
              localField: 'IdUsuario',
              foreignField: '_id',
              as: 'Usuario'
            }
          }
        ])
        .toArray();
      console.log('Resultado del $lookup:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
  }
  
// realizarLookup();


async function realizarLookup() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .aggregate([
          {
            $lookup: {
              from: 'Referencias',
              localField: 'IdReferencia',
              foreignField: '_id',
              as: 'Referencia'
            }
          }
        ])
        .toArray();
      console.log('Resultado del $lookup:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// realizarLookup();


async function pipelineEjemplo1() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .aggregate([
          {
            $match: { Cantidad: { $gte: 5 } }
          },
          {
            $group: {
              _id: '$IdUsuario',
              totalCompras: { $sum: 1 }
            }
          },
          {
            $sort: { totalCompras: -1 }
          }
        ])
        .toArray();
      console.log('Resultado del pipeline:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// pipelineEjemplo1();

async function pipelineEjemplo2() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .aggregate([
          {
            $lookup: {
              from: 'Usuarios',
              localField: 'IdUsuario',
              foreignField: '_id',
              as: 'Usuario'
            }
          },
          {
            $unwind: '$Usuario'
          },
          {
            $project: {
              CodigoCompra: 1,
              Cantidad: 1,
              'Usuario.Nombre': 1,
              'Usuario.Email': 1
            }
          }
        ])
        .toArray();
      console.log('Resultado del pipeline:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// pipelineEjemplo2();

async function ejemploLimit() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .find()
        .limit(5)
        .toArray();
      console.log('Los primeros 5 documentos son:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// ejemploLimit();

async function ejemploSort() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .find()
        .sort({ Fecha: -1 })
        .toArray();
      console.log('Los documentos ordenados por fecha descendente son:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// ejemploSort();

async function ejemploUnwind() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('Compras')
        .aggregate([
          {
            $unwind: '$Usuario'
          }
        ])
        .toArray();
      console.log('Resultado del $unwind:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// ejemploUnwind();
  
  
  
  
  

  
  
  
  
  
