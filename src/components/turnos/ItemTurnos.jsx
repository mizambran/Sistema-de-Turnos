import { Button } from "react-bootstrap"


const ItemTurnos = ({paciente, borrarPaciente, handleShowEditar, handleShowVer }) => {
  return (
    <>
    <tr>
        <td className="col-4">{paciente.id} </td>
        <td className="col-4">{paciente.nombre}</td>
        <td className="col-3 ">
            <Button variant="outline-primary" className="me-2" onClick={() => handleShowVer(paciente)} >👁️</Button>
            <Button variant="outline-warning" className="me-2" onClick={() => handleShowEditar(paciente)} >✏️</Button>
            <Button variant="outline-danger" onClick={() => borrarPaciente(paciente.id, paciente.nombre)} >❌</Button>
        </td>
    </tr>
    </>
  )
}

export default ItemTurnos
