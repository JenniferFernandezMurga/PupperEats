import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



export const VistaCarrito = () => {
    const [precio, setPrecio] = useState(29.99); // Precio inicial

    const handleFormatoChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const nuevoPrecio = selectedOption.dataset.precio;

        // Actualizar el precio si se seleccionó un formato
        if (nuevoPrecio) {
            setPrecio(nuevoPrecio);
        } else {
            setPrecio(29.99); // Precio por defecto
        }
    };
    return (
        <div className="container-fluid justify-content-center mt-1 bg-secondary text-dark bg-opacity-50">
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
                   
                    <div className="container-fluid overflow-hidden my-3 d-flex justify-content-start">
                    <div className="row">
                         <div className="col-md-8" style={{ width: "700px", height: "200px" }}>
                             <div className="card mb-3 d-flex flex-column" >
                                  <div className="row g-0 flex-fill">
                                  <div className="col-md-4">
                                <img src="https://era2vrmzk5n.exactdn.com/wp-content/uploads/2022/06/Pienso-Ayurveda-gato-kasaludintegral-1080x1080pix.jpg" className="img-fluid rounded-start m-1" alt="Producto" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex flex-column flex-grow-1">
                            <h5 className="card-title"><strong>Nombre del Producto</strong></h5>
                            <hr />
                            <div className="m-3 d-flex justify-content-around align-items-center">
                                <h2 className="card-text text-xl-start">{precio}€</h2>
                                <div>
                                    <label htmlFor="formatoProducto" className="form-label visually-hidden">Formato del Producto:</label>
                                    <select className="form-select form-select-sm" id="formatoProducto" onChange={handleFormatoChange}>
                                        <option value="">Seleccione un formato</option>
                                        <option value="1" data-precio="29.99">Formato 2Kg - 29.99€</option>
                                        <option value="2" data-precio="39.99">Formato 6Kg - 39.99€</option>
                                        <option value="3" data-precio="49.99">Formato 10Kg - 49.99€</option>
                                    </select>
                                </div>
                            </div>
                            <p className="card-text m-3 p-3">Descripción breve del producto que está en venta. Aquí puedes incluir características y beneficios.
                                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta).
                            </p>
                            <div className="mt-auto text-center">
                                <button className="btn btn-primary">Añadir carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
                </div>

                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <div className="container-fluid overflow-hidden my-3">
                        <form className="row g-3">
                            <div className="col-md-5">
                                <label htmlFor="inputCardNumber" className="form-label">Card#</label>
                                <input type="text" className="form-control" id="inputCardNumber" placeholder="XXXXXXXXXXXX" />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputCvc" className="form-label">CVC#</label>
                                <input type="text" className="form-control" id="inputCvc" placeholder="0000" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="inputAmount" className="form-label">Amount</label>
                                <input type="text" className="form-control" id="inputAmount" placeholder="Amount" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="inputFirstName" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputSecondName" className="form-label">Second Name</label>
                                <input type="text" className="form-control" id="inputSecondName" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputState" className="form-label">State</label>
                                <select id="inputState" className="form-select">
                                    <option value="" disabled selected>Pick a State</option>
                                    <option value="AL">Alabama</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputPostalCode" className="form-label">Postal Code</label>
                                <input type="text" className="form-control" id="inputPostalCode" />
                            </div>

                            <div className="col-md-6">
                                <p>We accept:</p>
                                <div className="btn-group rounded-1 bg-secondary px-2" data-toggle="buttons">
                                    {["MasterCard", "Visa", "Diners Club", "Amex"].map((card, index) => (
                                        <div className="form-check mx-1" key={index}>
                                            <input className="form-check-input" type="radio" name="creditCard" id={`card-${index}`} />
                                            <label className="form-check-label" htmlFor={`card-${index}`}>
                                                {card}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="floatingTextarea2">Message</label>
                                <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                                <small className="text-muted">Add any notes here.</small>
                            </div>

                            <div className="col-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-secondary me-md-2" type="button">Cancel</button>
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};