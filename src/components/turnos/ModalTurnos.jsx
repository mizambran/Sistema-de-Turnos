import { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ModalTurnos = ({showModal, handleCloseModal, guardarEdicion, editando, pacienteSeleccionado}) => {
  
    const {register, handleSubmit, reset, formState:{errors}, setValue} = useForm()
    
    useEffect(() => {
        if(pacienteSeleccionado){
            setValue("nuevoPaciente" , pacienteSeleccionado.nombre)
            reset()
        }
    }, [pacienteSeleccionado])

    const onSubmit = (data) => {
        
        guardarEdicion(pacienteSeleccionado.id, data.nuevoPaciente)
    }
  
  
    return (    
      <Modal show={showModal} onHide={handleCloseModal} >
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                
                    {editando ? (
                        <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Ingresa el nuevo paciente" {...register("nuevoPaciente", {
                                    required:"Este campo es obligatorio",
                                    minLength:{
                                        value:3,
                                        message:"Al menos tienes que ingresar 3 caracteres"
                                    }
                                })} 
                                
                            />
                            <Form.Text className="text-danger">
                                {errors.nuevoPaciente?.message}
                            </Form.Text>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                             <Button variant="secondary" type='button' className='me-2' onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                            <Button variant="success" type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </Form>
                    ) : 
                    (// --- Modo VER (Solo texto) ---
                    <p className="lead">Paciente: <strong>{pacienteSeleccionado ? pacienteSeleccionado.nombre : 'Cargando...'}</strong></p>
                    )}
            </Modal.Body>

            {/* En modo 'Ver', mostramos el botón de cerrar en el footer */}
            
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            
        </Modal>
    
  )
}

export default ModalTurnos
