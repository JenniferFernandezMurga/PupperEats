import React, { useState } from "react";
import { Link } from "react-router-dom";

export const VistaCarrito = () => {
    // const [formData, setFormData] = useState({
    //     nombre: '',
    //     direccion: '',
    //   });
    const [newContact, setNewContact] = useState({
        nombre: "",
        apellidos:"",
        dirección: "",
        códigoPostal: "",
        provincia: "",
        teléfono:""
    });
    const [carrito, setCarrito] = useState([]);
    const [unidades, setUnidades] = useState(1); // Unidades iniciales
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto seleccionado

    const productos = [
        { id: 1, name: 'Producto 1', price: 10 },
        { id: 2, name: 'Producto 2', price: 20 },
        { id: 3, name: 'Producto 3', price: 30 },
    ];
 // Función para manejar cambios en los inputs
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        // Aquí puedes hacer algo con los datos, como enviarlos a un servidor
      };
    const añadirCarrito = (producto) => {
        const existingProduct = carrito.find(item => item.id === producto.id);
        if (existingProduct) {
            // Si el producto ya está en el carrito, solo actualizar la cantidad
            setCarrito(carrito.map(item => 
                item.id === producto.id ? { ...item, cantidad: item.cantidad + unidades } : item
            ));
        } else {
            // Si no está en el carrito, agregarlo
            setCarrito([...carrito, { ...producto, cantidad: unidades }]);
        }
        setUnidades(1); // Restablecer unidades después de agregar
    };

    const aumentarUnidades = (productoId, nuevasUnidades) => {
        setCarrito(carrito.map(item => 
            item.id === productoId ? { ...item, cantidad: nuevasUnidades } : item
        ));
    };

    const handleFormatoChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const nuevaUnidad = parseInt(selectedOption.dataset.unidades, 10);
    
        if (!isNaN(nuevaUnidad)) {
            setUnidades(nuevaUnidad);
        } else {
            setUnidades(1); // Unidades por defecto
        }
    };

    // Calcular total y subtotal
    const calcularTotal = () => {
        const subtotal = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        const total = subtotal; // Aquí puedes agregar más lógica si es necesario (impuestos, envío, etc.)
        const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        return { subtotal, total, totalUnidades };
    };

    const { subtotal, total, totalUnidades } = calcularTotal();

    return (
        <div className="container-fluid justify-content-center mt-1 p-3 text-dark">
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">1. Carrito de compra</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">2. Dirección de envío y pago</a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                <div className="container-fluid overflow-hidden my-4 d-flex">
    <div className="row col-md-6 flex-grow-1">
        <h3 className="p-3">Productos en el carrito:</h3>
        {productos.map(producto => (
            <div className="col-md-8" key={producto.id}>
                <div className="card mb-3 d-flex flex-column">
                    <div className="row g-0 flex-fill">
                        <div className="col-md-2">
                            <img src="https://era2vrmzk5n.exactdn.com/wp-content/uploads/2022/06/Pienso-Ayurveda-gato-kasaludintegral-1080x1080pix.jpg" className="img-fluid rounded-start m-1" alt="Producto" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body d-flex flex-column flex-grow-1">
                                <h5 className="card-title"><strong>{producto.name}</strong></h5>
                            </div>

                            <div className="d-flex justify-content-between align-items-center m-3">
                                <div>
                                    <p className="card-text mb-0">Descripción breve del producto.</p>
                                    <h2 className="card-text text-sm-start">{producto.price}€</h2>
                                </div>

                                <div className="d-flex align-items-center" style={{ width: '100px' }}>
                                    <label htmlFor="formatoProducto" className="form-label visually-hidden">Cantidad:</label>
                                    <select className="form-select form-select-sm" id="formatoProducto" onChange={handleFormatoChange}>
                                        <option value="">Seleccione cantidad</option>
                                        <option value="1" data-unidades="1">1 udad.</option>
                                        <option value="2" data-unidades="2">2 uds.</option>
                                        <option value="3" data-unidades="3">3 uds.</option>
                                    </select>
                                </div>
                            </div>

                            {/* <div className="mt-auto text-center">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => { 
                                        setSelectedProduct(product); 
                                        addToCart(product); 
                                    }}
                                >
                                    Añadir carrito
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        ))}
                        </div>

                        {/* Div para mostrar el resumen del carrito */}
                        <div className="row col-md-3 m-3 rounded" style={{width:"400px", height:"200px"}}>
                            <h3 className="p-3">Resumen del carrito</h3>
                            <p>Total de productos: {totalUnidades}</p>
                            <p>Subtotal: {subtotal}€</p>
                            <p>IVA (21%): {(subtotal * 0.21).toFixed(2)}€</p>
                            <p>Total: {(subtotal + subtotal * 0.21).toFixed(2)}€</p>
                        </div>
                    </div>

                    <ul>
                        {carrito.map(item => (
                            <li key={item.id}>
                                {item.name} - {item.cantidad} unidades 
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={item.cantidad} 
                                    onChange={(e) => aumentarUnidades(item.id, parseInt(e.target.value))} 
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <!--FORMULARIO--> */}
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <div className="container-fluid overflow-hidden my-3">
                      

                      
                      <form className="form" onSubmit={handleSubmit}>
    <div className="Tittle justify-content-center">
    <h2 className="text-start">Dirección y método de envío</h2>
    </div>

    <div className="row">
        <div className="col-sm-5">
            <label htmlFor="inputFullName1" className="col-form-label text-start">Nombre</label>
            <input type="text" className="form-control" id="inputFullName1" placeholder="Nombre" onChange={handleChange} name="nombre" value={newContact.nombre} />
        </div>

        <div className="col-sm-5">
            <label htmlFor="inputFullName2" className="col-form-label text-start">Apellidos</label>
            <input type="text" className="form-control" id="inputFullName2" placeholder="Apellidos" onChange={handleChange} name="apellidos" value={newContact.apellidos} />
        </div>
    </div>

   
    <div className="row">
        <div className="col-sm-5">
            <label htmlFor="inputPhone" className="col-form-label text-start">Teléfono</label>
            <input type="text" className="form-control" id="inputPhone" placeholder="Teléfono" onChange={handleChange} name="teléfono" value={newContact.teléfono} />
        </div>

        <div className="col-sm-5">
            <label htmlFor="inputEmail" className="col-form-label text-start">Email</label>
            <input type="text" className="form-control" id="inputEmail" placeholder="Email" onChange={handleChange} name="email" value={newContact.email} />
        </div>
    </div>

    <div className="row">
    <div className="col-sm-10">
        <label htmlFor="inputAddress" className="col-sm-2 col-form-label text-start">Dirección</label>
        <div className="col-sm-12">
            <input type="text" className="form-control" id="inputAddress" placeholder="Ingrese dirección" onChange={handleChange} name="dirección" value={newContact.dirección} />
        </div>
        </div>
    </div>

    <div className="row">
        <div className="col-sm-5">
            <label htmlFor="inputPostal" className="col-form-label text-start">Código Postal</label>
            <input type="text" className="form-control" id="inputPostal" placeholder="Código Postal" onChange={handleChange} name="postal" value={newContact.códigoPostal} />
        </div>

        <div className="col-sm-5">
            <label htmlFor="inputCiudad" className="col-form-label text-start">Ciudad</label>
            <input type="text" className="form-control" id="inputCiudad" placeholder="Ciudad" onChange={handleChange} name="ciudad" value={newContact.ciudad} />
        </div>
    </div>

    <div className="row my-4">
        
    <div className="col-sm-5 p-3 ms-3 bg-success bg-gradient rounded">

        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
        <label className="form-check-label" for="flexRadioDefault1">
            <h6>Envío urgente 4,99€</h6>
            <p>24/48 horas MRW</p>
        </label>
    </div>

    <div className="col-sm-5 p-3 ms-3 bg-success bg-gradient rounded">
<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
<label className="form-check-label" for="flexRadioDefault2">
<h6>Envío gratuito.</h6>
<p>Plazo de 3 a 4 días. Puntos de recogida Mondial Relay</p>
</label>
</div>
</div>
    <div className="botones direccion">
    <button type="submit" className="btn btn-primary mt-4 me-3 col-sm-2">Guardar</button>
    <button type="submit" className="btn btn-primary mt-4 col-sm-2">Cancelar</button>
    </div>

    <div className="col mt-4 pasarela">
        
        <div className="col-sm-8 p-3 mb-3 bg-success bg-gradient rounded">
    
            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault3" checked/>
            <label className="form-check-label" for="flexRadioDefault3">
                {/* <h6>Envío urgente 4,99€</h6>
                <p>24/48 horas MRW</p> */}
            </label>
        </div>
    
        <div className="col-sm-8 p-3 mb-3 bg-success bg-gradient rounded">
    <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault4" checked/>
    <label className="form-check-label" for="flexRadioDefault4">
    <h6>Envío gratuito.</h6>
    <p>Plazo de 3 a 4 días. Puntos de recogida Mondial Relay</p>
    </label>
    </div>
    </div>

    <div className="botones pago">
    <button type="submit" className="btn btn-primary mt-4 me-3 col-sm-2">Pagar</button>
    <button type="submit" className="btn btn-primary mt-4 col-sm-2">Cancelar</button>
    </div>






</form>

             </div>                   
            </div>
               </div>
                 </div>

    );
};
