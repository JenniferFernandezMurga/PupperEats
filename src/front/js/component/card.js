import React, { useState, useEffect, useContext } from "react";
import { Modal } from "../component/modal";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Importa el contexto

export const Card = () => {
  const { store, actions } = useContext(Context); // Usa el contexto global de Flux
  const [abrirModal, setAbrirModal] = useState(false);
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState({});

  // Función para abrir el modal
  const clickAbrirModal = (id) => {
    setContactoSeleccionado(id);
    setAbrirModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setAbrirModal(false);
    setContactoSeleccionado(null);
  };

  // Función para manejar el cambio de imagen
  const manejarCambioImagen = (e, contactoId) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const imagenURL = URL.createObjectURL(archivo);
      setImagenSeleccionada((prevImagenes) => ({
        ...prevImagenes,
        [contactoId]: imagenURL,
      }));
    }
  };

  return (
    <div className="container mt-3">
      {store.contacts.length === 0 ? (
        <p>No hay contactos disponibles.</p>
      ) : (
        store.contacts.map((contacto) => (
          <div className="card mb-3 shadow-sm rounded-lg" key={contacto.id}>
            <div className="row g-0 d-flex align-items-center">
              {/* Imagen a la izquierda */}
              <div className="col-3 col-md-2">
                <img
                  src={imagenSeleccionada[contacto.id] || "https://static.vecteezy.com/system/resources/previews/018/765/757/large_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"}
                  className="img-fluid rounded-start"
                  alt="Imagen de contacto"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => manejarCambioImagen(e, contacto.id)}
                  style={{ display: "block", marginTop: "10px" }}
                />
              </div>

              {/* Datos a la derecha de la imagen */}
              <div className="col-9 col-md-8">
                <div className="card-body">
                  <h5 className="card-title text-dark">{contacto.name}</h5>
                  <div className="mb-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <span className="ms-2">{contacto.address}</span>
                  </div>
                  <div className="mb-2">
                    <i className="fa-solid fa-phone"></i>
                    <span className="ms-2">{contacto.phone}</span>
                  </div>
                  <div className="mb-2">
                    <i className="fa-solid fa-envelope"></i>
                    <span className="ms-2">{contacto.email}</span>
                  </div>
                </div>
              </div>

              {/* Botones de editar y eliminar */}
              <div
                className="col-12 col-md-2 d-flex justify-content-end align-items-center"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              >
                <Link to="/editarContacto" className="btn btn-outline-primary btn-sm me-2">
                  <i className="fa-solid fa-pencil me-1"></i>Editar
                </Link>
                <span
                  onClick={() => clickAbrirModal(contacto.id)}
                  className="text-danger cursor-pointer"
                  style={{ fontSize: "1.25rem" }}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </span>
              </div>
            </div>
          </div>
        ))
      )}
      <Modal
        abrirModal={abrirModal}
        cerrarModal={cerrarModal}
        contactoId={contactoSeleccionado}
        actualizarContactos={async () => {
          await actions.borrarContacto(contactoSeleccionado);
          cerrarModal(); // Cierra el modal después de actualizar
        }}
      />
    </div>
  );
};
