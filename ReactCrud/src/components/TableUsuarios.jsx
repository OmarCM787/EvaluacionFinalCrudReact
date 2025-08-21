import './TableUsuarios.css';

export function TableInfo({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 &&
          data.map((Usuarios) => (
            <tr key={Usuarios.IdUsuario}>
              <td>{Usuarios.IdUsuario}</td>
              <td>{Usuarios.Nombre}</td>
              <td>{Usuarios.Apellido}</td>
              <td>{Usuarios.Direccion}</td>
              <td>{Usuarios.Edad}</td>
              <td>
                <button onClick={() => onEdit(Usuarios)}>Editar</button>
                <button onClick={() => onDelete(Usuarios.IdUsuario)}>Eliminar</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
