"use client"
import React ,{useEffect, useState}from 'react'
import { useForm } from "react-hook-form";
import { TemplateHandler } from 'easy-template-x';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from "../../firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
function DateDisplay()  {

  
    const currDay = new Date().getDate();
    const currMonth = new Date().toLocaleString([], {
      month: 'long',
    });
    const currYear = new Date().getFullYear();
  
    return ( `${currDay} ${currMonth} , ${currYear}`);
  }

function saveFile(filename, blob) {
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement("a");
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}
function calculateTotalCost(productos) {
    let totalCost = 0;
  
    productos.forEach(producto => {
      const cantidad = parseFloat(producto.cantidad);
      const precio = parseFloat(producto.precio);
  
      if (!isNaN(cantidad) && !isNaN(precio)) {
        totalCost += cantidad * precio;
      }
    });
  
    return totalCost;
  }
  const loadImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };
 
function FileForm({processedModels}) {
  const [img, setImg] = useState();
      
  
  //console.log(processedModels)
  const [companyInfo, setCompanyInfo] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const storage = getStorage();
  // Define your state variables
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    // Assuming you have some method to fetch company data from Firebase
    // and assuming that method is asynchronous
    const fetchCompanyInfo = async () => {
      try {
        
    
        const userDoc = await getDoc(doc(db, "users", currentUser.email));
        console.log(currentUser.email)
        
        const companyData = {photoUrl: userDoc.data().photoURL,name:userDoc.data().companyName ,email:userDoc.data().companyEmail, phone:userDoc.data().companyPhone, address: userDoc.data().companyAddress}; // Replace with actual fetch method
        
        console.log(companyData)
        setCompanyInfo(companyData);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    }
    fetchCompanyInfo();
  }, []); 
  useEffect(() => {
  loadImage(companyInfo.photoUrl).then((res) => setImg(res));;
    
  }, []);

  const { handleSubmit, register } = useForm();
    const [productos, setProductos] = useState(
      processedModels.map((model) => ({
        producto: '',
        cantidad: '',
        precio: '',
        processedModel: model,
      })))

      const handleAgregarFila = () => {
        setProductos([...productos, { producto: '', cantidad: '', precio: '', processedModel: '' }]);
      };
  
    const handleEliminarFila = (index) => {
      const nuevosProductos = productos.filter((_, i) => i !== index);
      setProductos(nuevosProductos);
    }
  
    const handleChangeCantidad = (index, e) => {
      const nuevosProductos = [...productos];
      nuevosProductos[index].cantidad = e.target.value;
      setProductos(nuevosProductos);
    }
    
    const handleChangePrecio = (index, e) => {
      const nuevosProductos = [...productos];
      nuevosProductos[index].precio = e.target.value;
      setProductos(nuevosProductos);
    }
    const handleChangeProducto = (index, e) => {
      const nuevosProductos = [...productos];
      nuevosProductos[index].producto = e.target.value;
      setProductos(nuevosProductos);
    }
    
    const handleChangeProcessedModel = (index, processedModel) => {
      const nuevosProductos = [...productos];
      nuevosProductos[index].processedModel = [processedModel]; // Wrap the model in an array
      setProductos(nuevosProductos);
    }
    const onSubmit = async (e) => {


    const templateDoc = await fetch('/template.docx'); // Ruta relativa a la carpeta public
    const templateBlob = await templateDoc.blob();
    const handler = new TemplateHandler();
    
    const totalCost = calculateTotalCost(productos);


    const itemsData = productos.map((producto) => ({
        name: producto.producto,
        quantity: producto.cantidad,
        price: producto.precio,
        cost: producto.cantidad * producto.precio
      }));
      console.log(typeof(companyInfo.photoUrl))

     
      console.log(typeof(img))
      const data= {
        name:[e.nombre],
        surname:[e.apellido],
        invoice:[e.numeroFactura],
        company:
        [
           { name: e.nombreCompania,email: e.emailCompania,phone: e.telefonoCompania, address: companyInfo.address}
        ],
        date:[DateDisplay()],
        total:[totalCost.toString()],
        items: itemsData,
        logo:{_type:"image",source:img,format:img ? img.type : undefined,width:200,height:200}
      }
      console.log(data)

      const doc = await handler.process(templateBlob, data);
      saveFile('report.docx', doc);
  }
  

 return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div  className='pb-3 mt-10 mr-4 text-lg font-semibold text-white title' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexBasis: '45%' }}>
            <fieldset>
              <label>
                <p>Nombre</p>
                <input name="nombre"  className='mr-4 '{...register('nombre', { required: true })} />
              </label>
              
              <label>
  <p>Nombre de la Compañía</p>
  <input
    value={companyInfo.name  || ''}
    name="nombreCompania"
    className='mr-4'
    readOnly={!!currentUser} // Make it read-only if there is a currentUser
    {...register('nombreCompania', { required: true })}
  />
</label>
<label>
  <p>Email de la Compañía</p>
  <input
    value={companyInfo.email || ''}
    name="emailCompania"
    className='mr-4'
    readOnly={!!currentUser} // Make it read-only if there is a currentUser
    {...register('emailCompania', { required: true })}
  />
</label>
<label>
  <p>Teléfono de la Compañía</p>
  <input
    value={companyInfo.phone || ''}
    name="telefonoCompania"
    className='mr-4'
    readOnly={!!currentUser} // Make it read-only if there is a currentUser
    {...register('telefonoCompania', { required: true })}
  />
</label>

            </fieldset>
          </div>
          <div style={{ flexBasis: '45%' }}>
            <fieldset>
            <label>
                <p>Apellido</p>
                <input name="apellido" {...register('apellido', { required: true })} />
              </label>
              <label>
                <p>Número de Factura</p>
                <input name="numeroFactura" {...register('numeroFactura', { required: true })} />
              </label>
              <label>
                <p>Nombre del Trabajador</p>
                <input name="nombreTrabajador" {...register('nombreTrabajador', { required: true })} />
              </label>
              {/* Agrega aquí los campos adicionales de la segunda columna si los tienes */}
            </fieldset>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
      <fieldset>
        <label>
          <p>Tabla de Productos</p>
          <table>
            <thead>
              <tr>
              <th>Processed Models</th>
                <th>Producto</th>
                
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                 <td>
  {producto.processedModel && (
    <div>
        {producto.processedModel.name}
    </div>
  )}
</td>
                  <td>
                    <input
                      type="text"
                      value={producto.producto}
                      onChange={(e) => handleChangeProducto(index, e)}
                      className="mr-4"
                    />
                  </td>
                  
                  <td>
                    <input
                      type="text"
                      value={producto.cantidad}
                      onChange={(e) => handleChangeCantidad(index, e)}
                      className="mr-4"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={producto.precio}
                      onChange={(e) => handleChangePrecio(index, e)}
                      className="mr-4"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className='border rounded-t-[10px] hover:bg-rose-400 border-white-500 hover:text-white'
                      onClick={() => handleEliminarFila(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="px-4 py-2 mr-4 border rounded border-white-500 hover:bg-blue-500 hover:text-white"
            onClick={handleAgregarFila}
          >
            Agregar Producto
          </button>
        </label>
      </fieldset>
    </div>
        <button type="submit" className="px-4 py-2 mt-10 mr-4 border rounded border-white-500 hover:bg-blue-500 hover:text-white">Submit</button>
      </form>
    </div>
  )
  
}

export default FileForm