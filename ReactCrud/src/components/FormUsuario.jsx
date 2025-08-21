import { useState, useEffect } from "react";

export function FormUsuarios({ guardarUsuario, datosEditar, cancelarEdicion }) {
  const [datos, setDatos] = useState({
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Edad: "",
  });

  useEffect(() => {
    if (datosEditar) {
      setDatos(datosEditar);
    }
  }, [datosEditar]);

  const manejarCambio = (e) => {
  const { name, value } = e.target;
  setDatos({ ...datos, [name]: value });
};


  const enviar = (e) => {
    e.preventDefault();
    guardarUsuario(datos);
    setDatos({ Nombre: "", Apellido: "", Direccion: "", Edad: "" });
  };

  return (
    <form onSubmit={enviar} style={{ marginBottom: "15px" }}>

      <input name="Nombre" placeholder="Nombre" value={datos.Nombre} onChange={manejarCambio}/> 

      <input name="Apellido" placeholder="Apellido" value={datos.Apellido} onChange={manejarCambio}/>

      <input name="Direccion" placeholder="Dirección" value={datos.Direccion} onChange={manejarCambio}/>

      <input type="number" name="Edad" placeholder="Edad" value={datos.Edad} onChange={manejarCambio}/>

      <button type="submit">
        {datosEditar ? "Actualizar" : "Guardar"}
      </button>
      {datosEditar && (
        <button type="button" onClick={cancelarEdicion}>
          Cancelar
        </button>
      )}
    </form>
  );
}
