import ItemTurnos from "./ItemTurnos"
import Table from 'react-bootstrap/Table';



const ListadoDeTurnos = ({pacientes, borrarPaciente, handleShowEditar, handleShowVer}) => {
  return (
    <div className="container my-5 ">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Paciente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {pacientes.map((paciente) => <ItemTurnos paciente={paciente} borrarPaciente={borrarPaciente} handleShowEditar={handleShowEditar} handleShowVer={handleShowVer} ></ItemTurnos>)}  
      </tbody>
    </Table>
    </div>
  )
}

export default ListadoDeTurnos
