import { useEffect, useState } from "react"
import ListadoDeTurnos from "./ListadoDeTurnos"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import ModalTurnos from "./ModalTurnos";

const FormDeTurnos = () => {
    
    const pacientesLocalStorage = JSON.parse(localStorage.getItem("pacientesKey")) || [];

    const {register, handleSubmit, reset, formState:{errors}, setValue} = useForm()

    const [pacientes, setPacientes] = useState(pacientesLocalStorage);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(false);

    
    const handleCloseModal = () =>{
        setPacienteSeleccionado(null);
        setEditando(false);
        setShowModal(false)
    }

    
    const handleShowEditar = (paciente) => {
        setPacienteSeleccionado(paciente)
        setEditando(true);
        setShowModal(true)
    }

    
    const handleShowVer = (paciente) =>{
        setPacienteSeleccionado(paciente)
        setEditando(false);
        setShowModal(true)
    }

    const crearPaciente = (data) => {
        const nuevoPaciente = {
            id: uuidv4(),
            nombre: data.paciente
        }
        setPacientes([...pacientes, nuevoPaciente])
        reset()

        Swal.fire(
            {
                title:"Paciente creado!",
                text:`El paciente "${data.paciente}" se creo con exito.`,
                icon:"success"
            }
        )
    }

    const borrarPaciente = (idPaciente, nombrePaciente) => {
        Swal.fire({
        title: "Seguro que quieres eliminar?",
        text: "No se puede revertir la acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, continuar"
        }).then((result) => {
        
         if (result.isConfirmed) {
    
       const pacientesActualizados = pacientes.filter((itemPaciente) => itemPaciente.id !== idPaciente)
        setPacientes(pacientesActualizados)
    
    Swal.fire({
      title: "Eliminado!",
      text: `El Paciente "${nombrePaciente}" se elimino correctamente!`,
      icon: "success"
    });
    }
    }); 
    }

    
    const guardarEdicion = (id, nuevoNombrePaciente) => {
        const pacientesActualizados = pacientes.map((paciente) => {
            if(paciente.id === id) {
                return {...paciente, nombre:nuevoNombrePaciente}
            }
            return paciente
        })
        setPacientes(pacientesActualizados)
        handleCloseModal()
        Swal.fire(
            {
                title:"Paciente Actualizado!",
                text:`Ahora el paciente se llama ${nuevoNombrePaciente} . `,
                icon: "success"
            }
        )
    }

    useEffect(() => {
        localStorage.setItem("pacientesKey", JSON.stringify(pacientes))
    }, [pacientes])
    
  return (
    <div>
        <Form className="container mt-5" onSubmit={handleSubmit(crearPaciente)}>
      <Form.Group className="mb-3 d-flex justify-content-between gap-4">
        <Form.Control type="text" placeholder="Ingresar Paciente" {...register("paciente", {
            required:"Este campo es obligatorio",
            minLength:{
                value:3,
                message:"Tienes que ingresar al menos 3 caracteres"
            }
        })} />
        <Button variant="primary" type="submit">
        Guardar
      </Button>  
      </Form.Group>
      <Form.Text className="text-danger">
          {errors.paciente?.message}
        </Form.Text>
    </Form>

        <ListadoDeTurnos pacientes={pacientes} borrarPaciente={borrarPaciente} handleShowEditar={handleShowEditar} handleShowVer={handleShowVer}></ListadoDeTurnos>
        <ModalTurnos showModal={showModal}  handleCloseModal={handleCloseModal} pacienteSeleccionado={pacienteSeleccionado} editando={editando} guardarEdicion={guardarEdicion} ></ModalTurnos>
    </div>
        
  )
}

export default FormDeTurnos
