import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const dataUser = { name, email, password };
            if (isSignup) {
                await actions.signup(dataUser, navigate);
                setSuccessMessage('¡Registro exitoso! Redirigiendo...');
                setTimeout(() => {
                    setIsSignup(false);
                },);
            } else {
                await actions.login(email, password, navigate);
            }
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError('Error al procesar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="card-body">
                    {!isSignup ? (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center mb-3">Iniciar sesión</h2>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Cargando...' : 'Iniciar sesión'}
                            </button>
                            {error && <p className="text-danger text-center mt-2">{error}</p>}
                            <p className="text-center mt-3">
                                ¿No tienes cuenta? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsSignup(true)}>Regístrate</span>
                            </p>
                            <p className="text-center mt-1">
                                <Link to="/RecuperacionContraseña" className="text-primary">¿Olvidaste tu contraseña?</Link>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center mb-3">Regístrate</h2>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Cargando...' : 'Registrar'}
                            </button>
                            {error && <p className="text-danger text-center mt-2">{error}</p>}
                            {successMessage && <p className="text-success text-center mt-2">{successMessage}</p>}
                            <p className="text-center mt-3">
                                ¿Ya tienes cuenta? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsSignup(false)}>Inicia sesión</span>
                            </p>
                        </form>
                    )}
                    <Link to="/" className="text-center d-block mt-3 text-secondary">Volver a la página principal</Link>
                </div>
            </div>
        </div>
    );
};
