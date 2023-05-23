const { MongoClient } = require('mongodb');

const faker = require('faker');

const url = 'mongodb+srv://juanpineda:11@cluster0.gvnh0n1.mongodb.net/?retryWrites=true&w=majority';

async function crearColeccion() {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const db = cliente.db('BabySoft');
    await db.createCollection("Proveedores", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            title: "Compras Object Validation",
            required: [ "IdProveedor", "NitProveedor", "NombreProveedor", "CorreoProveedor" ,"Marcas" ,"Fecha" ],
            properties: {
                IdProveedor: {
                  bsonType: "int",
                  description: "'IdProveedor' debe ser int-entero"
               },
               NitProveedor: {
                  bsonType: "int",
                  description: "'NitProveedor' debe ser int-entero"
               },
               NombreProveedor: {
                  bsonType: "string",
                  description: "'NombreProveedor' debe ser string"
               },
               CorreoProveedor: {
                  bsonType: "string",
                  description: "'CorreoProveedor' debe ser string"
               },
               Marcas: {
                  bsonType: "string",
                  description: "'Marcas' debe ser string"
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
      const proveedoresCollection = db.collection('Proveedores');
      const documentos = [];
  
      for (let i = 0; i < 2000; i++) {
        const proveedor = {
          IdProveedor: i + 1,
          NitProveedor: faker.random.number(),
          NombreProveedor: faker.name.findName(),
          CorreoProveedor: faker.internet.email(),
          Marcas: faker.company.companyName(),
          Fecha: faker.date.past()
        };
        documentos.push(proveedor);
      }
  
      await proveedoresCollection.insertMany(documentos);
      console.log('Documentos insertados exitosamente');
    } catch (error) {
      console.error('Error al insertar los documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// insertarDocumentos();

async function insertarProveedor(proveedor) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const result = await proveedoresCollection.insertOne(proveedor);
      console.log('Documento insertado exitosamente');
      console.log(result.insertedId);
    } catch (error) {
      console.error('Error al insertar el documento:', error);
    } finally {
      cliente.close();
    }
  }
  
  const proveedor = {
    IdProveedor: 1,
    NitProveedor: 12345,
    NombreProveedor: 'Proveedor 1',
    CorreoProveedor: 'proveedor1@example.com',
    Marcas: 'Marca 1',
    Fecha: new Date()
};
  
// insertarProveedor(proveedor);

async function insertarProveedores(proveedores) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const result = await proveedoresCollection.insertMany(proveedores);
      console.log('Se insertaron los siguientes documentos:');
      console.log(result.insertedIds);
    } catch (error) {
      console.error('Error al insertar los documentos:', error);
    } finally {
      cliente.close();
    }
  }
  
  const proveedores = [
    {
      IdProveedor: 1,
      NitProveedor: 12345,
      NombreProveedor: 'Proveedor 1',
      CorreoProveedor: 'proveedor1@example.com',
      Marcas: 'Marca 1',
      Fecha: new Date()
    },
    {
      IdProveedor: 2,
      NitProveedor: 67890,
      NombreProveedor: 'Proveedor 2',
      CorreoProveedor: 'proveedor2@example.com',
      Marcas: 'Marca 2',
      Fecha: new Date()
    }
];
  
// insertarProveedores(proveedores);


async function buscarProveedores() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const proveedores = await proveedoresCollection.find({}).toArray();
      console.log('Proveedores encontrados:');
      console.log(proveedores);
    } catch (error) {
      console.error('Error al buscar los proveedores:', error);
    } finally {
      cliente.close();
    }
}
  
// buscarProveedores();


async function buscarProveedorPorId(idProveedor) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const proveedor = await proveedoresCollection.findOne({ IdProveedor: idProveedor });
      console.log('Proveedor encontrado:');
      console.log(proveedor);
    } catch (error) {
      console.error('Error al buscar el proveedor:', error);
    } finally {
      cliente.close();
    }
}
  
//   const idProveedor = 1;
//   buscarProveedorPorId(idProveedor);


async function actualizarProveedor(idProveedor, nuevosDatos) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const result = await proveedoresCollection.updateOne(
        { IdProveedor: idProveedor },
        { $set: nuevosDatos }
      );
      console.log('Documento actualizado exitosamente');
      console.log(result.modifiedCount);
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    } finally {
      cliente.close();
    }
}
  
//   const idProveedor = 1;
//   const nuevosDatos = { NombreProveedor: 'Nuevo Proveedor' };
//   actualizarProveedor(idProveedor, nuevosDatos);


async function actualizarProveedores(filtro, nuevosDatos) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const result = await proveedoresCollection.updateMany(
        filtro,
        { $set: nuevosDatos }
      );
      console.log('Documentos actualizados exitosamente');
      console.log(result.modifiedCount);
    } catch (error) {
      console.error('Error al actualizar los documentos:', error);
    } finally {
      cliente.close();
    }
}
  
//   const filtro = { Marcas: 'Marca 1' };
//   const nuevosDatos = { Marcas: 'Nueva Marca' };
//   actualizarProveedores(filtro, nuevosDatos);



async function eliminarProveedor(idProveedor) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const result = await proveedoresCollection.deleteOne({ IdProveedor: idProveedor });
      console.log('Documento eliminado exitosamente');
      console.log(result.deletedCount);
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    } finally {
      cliente.close();
    }
}
  
//   const idProveedor = 1;
//   eliminarProveedor(idProveedor);

async function eliminarProveedores(filtro) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const result = await proveedoresCollection.deleteMany(filtro);
      console.log('Documentos eliminados exitosamente');
      console.log(result.deletedCount);
    } catch (error) {
      console.error('Error al eliminar los documentos:', error);
    } finally {
      cliente.close();
    }
}
  
//   const filtro = { Marcas: 'Marca 1' };
//   eliminarProveedores(filtro);



async function eliminarColeccion(coleccion) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      await db.collection(coleccion).drop();
      console.log(`Colección ${coleccion} eliminada exitosamente`);
    } catch (error) {
      console.error('Error al eliminar la colección:', error);
    } finally {
      cliente.close();
    }
}
  
//   const coleccion = 'Proveedores';
//   eliminarColeccion(coleccion);


async function eliminarDocumento(coleccion, filtro) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection(coleccion);
  
      const result = await proveedoresCollection.deleteMany(filtro);
      console.log('Documento eliminado exitosamente');
      console.log(result.deletedCount);
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    } finally {
      cliente.close();
    }
}
  
//   const coleccion = 'Proveedores';
//   const filtro = { IdProveedor: 1 };
//   eliminarDocumento(coleccion, filtro);


async function realizarUnion() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
      const comprasCollection = db.collection('Compras');
  
      const resultado = await proveedoresCollection.aggregate([
        {
          $lookup: {
            from: 'Compras',
            localField: 'IdProveedor',
            foreignField: 'IdProveedor',
            as: 'ComprasProveedor'
          }
        }
      ]).toArray();
  
      console.log('Resultado de la unión:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al realizar la unión:', error);
    } finally {
      cliente.close();
    }
}
  
//   realizarUnion();


async function usarPipelines() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const resultado = await proveedoresCollection.aggregate([
        { $match: { Marcas: 'Marca 1' } },
        { $sort: { NombreProveedor: 1 } },
        { $limit: 10 }
      ]).toArray();
  
      console.log('Resultado del pipeline:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al usar el pipeline:', error);
    } finally {
      cliente.close();
    }
}
  
//   usarPipelines();



async function limitarResultados() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const resultado = await proveedoresCollection.find({})
        .limit(5)
        .toArray();
  
      console.log('Resultado limitado:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al limitar los resultados:', error);
    } finally {
      cliente.close();
    }
}
  
//   limitarResultados();


async function ordenarResultados() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const resultado = await proveedoresCollection.find({})
        .sort({ NombreProveedor: 1 })
        .toArray();
  
      console.log('Resultado ordenado:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al ordenar los resultados:', error);
    } finally {
      cliente.close();
    }
}
  
//   ordenarResultados();


async function descomponerArray() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const proveedoresCollection = db.collection('Proveedores');
  
      const resultado = await proveedoresCollection.aggregate([
        { $unwind: '$Marcas' }
      ]).toArray();
  
      console.log('Resultado descompuesto:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al descomponer el array:', error);
    } finally {
      cliente.close();
    }
}
  
//   descomponerArray();
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


