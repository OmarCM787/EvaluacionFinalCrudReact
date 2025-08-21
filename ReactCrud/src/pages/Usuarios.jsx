import { useEffect, useState } from "react";
import { TableInfo } from "../components/TableUsuarios";
import { FormUsuarios } from "../components/FormUsuario";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editUsuario, setEditUsuario] = useState(null);

  const _url = "http://localhost:3000/Usuarios";

  useEffect(() => {
    fetch(_url)
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  }, []);

  const adicionarUsuario = (usuario) => {
    fetch(_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((data) => setUsuarios([...usuarios, data])); 
  };

const actualizarUsuario = (usuario) => {
  fetch(`${_url}/${usuario.IdUsuario}`, {  
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  })
    .then((res) => res.json())
    .then((data) => {
      setUsuarios(
        usuarios.map((u) =>
          u.IdUsuario === data.IdUsuario ? data : u
        )
      );
      setEditUsuario(null); 
    });
};

  const eliminarUsuario = async (IdUsuario) => {
    await fetch(`${_url}/${IdUsuario}`, { method: "DELETE" });
    setUsuarios(usuarios.filter((u) => u.IdUsuario !== IdUsuario));
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <p>(F5 para actualizar la tabla despues de cada operacion)</p>

      <FormUsuarios
        guardarUsuario={editUsuario ? actualizarUsuario : adicionarUsuario} 
        datosEditar={editUsuario} 
        cancelarEdicion={() => setEditUsuario(null)} 
      />

      <TableInfo
        data={usuarios}
        onEdit={(usuario) => setEditUsuario(usuario)}
        onDelete={eliminarUsuario}
      />
    </div>
  );
}
