const { MongoClient } = require('mongodb');

const faker = require('faker');

const url = 'mongodb+srv://juanpineda:1015@cluster0.gvnh0n1.mongodb.net/?retryWrites=true&w=majority';

async function crearColeccion() {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const db = cliente.db('BabySoft');
    await db.createCollection("DetalleCompras", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            title: "Compras Object Validation",
            required: [ "IdDetalleCompra", "IdCompra", "IdReferencia", "IdUsuario" ,"Cantidad" ,"Precio" ],
            properties: {
                IdDetalleCompra: {
                  bsonType: "int",
                  description: "'IdDetalleCompra' debe ser int-entero"
               },
               IdCompra: {
                  bsonType: "int",
                  description: "'IdCompra' debe ser int-entero"
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
               Precio: {
                  bsonType: "int",
                  description: "'Precio' debe ser int-entero"
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

crearColeccion();


async function insertarDocumentos() {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const comprasCollection = db.collection('DetalleCompras');
      const documentos = [];
  
      for (let i = 0; i < 2000; i++) {
        const compra = {
            IdDetalleCompra: faker.random.number(),
            IdCompra: faker.random.number(),
            IdReferencia: faker.random.number(),
            IdUsuario: faker.random.number(),
            Cantidad: faker.random.number(),
            Precio: faker.random.number(),
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
  
// insertarDocumentos();

async function insertarCompra(compra) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .insertOne(compra);
      console.log('Se insertó el siguiente documento:');
      console.log(result.insertedId);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
  }
  
  // Uso de la función insertarCompra
  const compra = {
    IdDetalleCompra: 1,
    IdCompra: 2,
    IdReferencia: 3,
    IdUsuario: 1,
    Cantidad: 21,
    Precio: 20000
};
  
// insertarCompra(compra);
  

async function insertarCompras(compras) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .insertMany(compras);
      console.log('Se insertaron los siguientes documentos:');
      console.log(result.insertedIds);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
  }
  
  // Uso de la función insertarCompras
  const compras = [
    {
      IdDetalleCompra: 1,
      IdCompra: 2,
      IdReferencia: 3,
      IdUsuario: 1,
      Cantidad: 21,
      Precio: 20000
    },
    {
      IdDetalleCompra: 1,
      IdCompra: 1,
      IdReferencia: 3,
      IdUsuario: 1,
      Cantidad: 21,
      Precio: 20000
    }
];
  
// insertarCompras(compras);

async function buscarDocumentos(criterio) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .find(criterio)
        .toArray();
      console.log('Documentos encontrados:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }

    // Uso de la función buscarDocumentos
    const criterio = { IdCompra: 1 };
}
  
// buscarDocumentos(criterio);

async function buscarDocumento(criterio) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .findOne(criterio);
      console.log('Documento encontrado:');
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }

    // Uso de la función buscarDocumento
    const criterio = { IdDetalleCompra: 1 };
}
  
// buscarDocumento(criterio);


async function actualizarDocumento(criterio, actualizacion) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .updateOne(criterio, actualizacion);
      console.log('Documento actualizado exitosamente');
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }

    // Uso de la función actualizarDocumento
  const criterio = { IdDetalleCompra: 1 };
  const actualizacion = { $set: { Cantidad: 10 } };
}
  
// actualizarDocumento(criterio, actualizacion);

async function actualizarDocumentos(criterio, actualizacion) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .updateMany(criterio, actualizacion);
      console.log('Documentos actualizados exitosamente');
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }

    // Uso de la función actualizarDocumentos
  const criterio = { IdCompra: 1 };
  const actualizacion = { $set: { Precio: 25000 } };

}
  
// actualizarDocumentos(criterio, actualizacion);

async function eliminarDocumento(criterio) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .deleteOne(criterio);
      console.log('Documento eliminado exitosamente');
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }

    // Uso de la función eliminarDocumento
  const criterio = { IdDetalleCompra: 1 };
}  
  
// eliminarDocumento(criterio);

async function eliminarDocumentos(criterio) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente
        .db('BabySoft')
        .collection('DetalleCompras')
        .deleteMany(criterio);
      console.log('Documentos eliminados exitosamente');
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }

    // Uso de la función eliminarDocumentos
    const criterio = { IdCompra: 2 };
}
  
// eliminarDocumentos(criterio);

async function eliminarColeccion() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      await db.collection('DetalleCompras').drop();
      console.log('Colección eliminada exitosamente');
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// eliminarColeccion();

async function eliminarBaseDatos() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      await cliente.db('BabySoft').dropDatabase();
      console.log('Base de datos eliminada exitosamente');
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// eliminarBaseDatos();


async function realizarJoin() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
  
      const resultado = await db.collection('DetalleCompras').aggregate([
        {
          $lookup: {
            from: 'Referencias',
            localField: 'IdReferencia',
            foreignField: 'Id',
            as: 'referencia'
          }
        }
      ]).toArray();
  
      console.log('Resultado del join:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// realizarJoin();


async function usarPipeline() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
  
      const resultado = await db.collection('DetalleCompras').aggregate([
        { $match: { IdCompra: 1 } },
        { $sort: { Cantidad: -1 } },
        { $limit: 5 }
      ]).toArray();
  
      console.log('Resultado del pipeline:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// usarPipeline();

async function usarOtroPipeline() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
  
      const resultado = await db.collection('DetalleCompras').aggregate([
        { $group: { _id: '$IdCompra', total: { $sum: '$Cantidad' } } },
        { $match: { total: { $gte: 50 } } },
        { $sort: { total: -1 } }
      ]).toArray();
  
      console.log('Resultado del otro pipeline:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// usarOtroPipeline();

async function usarLimit() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
  
      const resultado = await db.collection('DetalleCompras').find().limit(10).toArray();
  
      console.log('Resultado de $limit:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// usarLimit();

async function usarSort() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
  
      const resultado = await db.collection('DetalleCompras').find().sort({ Cantidad: -1 }).toArray();
  
      console.log('Resultado de $sort:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// usarSort();

async function usarUnwind() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
  
      const resultado = await db.collection('DetalleCompras').aggregate([
        { $unwind: '$referencia' }
      ]).toArray();
  
      console.log('Resultado de $unwind:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      cliente.close();
    }
}
  
// usarUnwind();
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  