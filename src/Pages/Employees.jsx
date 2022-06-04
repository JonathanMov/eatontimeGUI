import './styles/Employees.css';

import NavBar from '../Components/NavBar.jsx';
import EmployeeResume from '../Components/EmployeeResume'

import Users from '../Data/users.json';
import { useEffect, useState } from 'react';

// Custom Hooks
import useFormModal from '../CustomHooks/useFormModal';

const Employees = () => {
    // Hooks
    const [employees, setEmployees] = useState([]);
    const [chefs, setChefs] = useState([]);
    const { showFormModal, setShowForm, formResponse, resetFormResponse } = useFormModal();
    const [modalConfiguration, setModalConfiguration] = useState(undefined);

    // Inputs for modal configs
    const inputConfigAdd = [
        {
            "id": "emp-number",
            "label": "Número de empleado",
            "input__type": "number",
            "style": {
                "width": "12ch"
            }
        },
        {
            "id": "emp-name",
            "label": "Nombre del empleado",
            "input__type": "text"
        },
        {
            "id": "emp-role",
            "label": "Rol del empleado",
            "input": true,
            "input__type": "radio",
            "radios__name": "employee-role",
            "radios__buttons": [
                {
                    "id": "employee-role-employee",
                    "label": "Empleado",
                    "checked": true
                },
                {
                    "id": "employee-role-chef",
                    "label": "Chef"
                }
            ]
        }
    ]

    const inputConfigUpdate = [
        {
            "id": "emp-number",
            "label": "Número de empleado",
            "input__type": "number",
            "style": {
                "width": "12ch"
            }
        },
        {
            "id": "emp-name",
            "label": "Nombre del empleado",
            "input__type": "text"
        },
        {
            "id": "emp-role",
            "label": "Rol del empleado",
            "input": true,
            "input__type": "radio",
            "radios__name": "employee-role",
            "radios__buttons": [
                {
                    "id": "employee-role-employee",
                    "label": "Empleado",
                    "checked": true
                },
                {
                    "id": "employee-role-chef",
                    "label": "Chef"
                }
            ]
        }
    ]
    // Configs
    const configurationAdd = {
        title: 'Registar nuevo empleado',
        description: null, 
        inputs: inputConfigAdd, 
        confirmButtonText: 'Añadir', 
        onSubmitAction: () => console.log('success')
    }
    
    const configurationUpdate = {
        title: 'Actualizar empleado',
        description: null, 
        inputs: inputConfigUpdate,
        confirmButtonText: 'Actualizar', 
        onSubmitAction: () => console.log('success')
    }

    useEffect(() => {
        setEmployees(Users.filter(usr => usr.USER_ROLE === 'EMPLOYEE'));
        setChefs(Users.filter(usr => usr.USER_ROLE === 'CHEF'));
    }, []);

    useEffect(() => {
        if(formResponse){
            resetFormResponse();
            setTimeout((setShowForm(false), 500))
        }
    },[formResponse]);

    const onNewHandler = () => {
        setModalConfiguration(configurationAdd);
        setShowForm(true);
    }
    const onUpdateHandler = () => {
        setModalConfiguration(configurationUpdate);
        setShowForm(true);
    }
    return (
        <main className="employees">
            <NavBar noBack />
            <div className="employees__add">
                <h2 className="employees__add-title">Lista de empleados</h2>
                <button className="employees__add-new" onClick={onNewHandler} >Nuevo</button>
            </div>
            <table className='employees__list' >
                <tbody id='gral__employees'>
                    <tr className="employees__list__headers">
                        <th>No. Empleado</th>
                        <th>Nombre empleado</th>
                        <th>Rol</th>
                        <th>Fecha de creación</th>
                    </tr>
                    {
                        employees.map(
                            emp =>
                                <EmployeeResume
                                    key={emp.R_USER_ID}
                                    empNo={emp.R_USER_ID}
                                    empName={emp.R_USER_NAME}
                                    empRole={emp.USER_ROLE}
                                    empDate={emp.CREATED_ON}
                                    onClick={onUpdateHandler}
                                />)
                    }
                </tbody>
                <tbody id='chef__employees'>
                    <tr className="employees__list__headers">
                        <th>No. Empleado</th>
                        <th>Nombre empleado</th>
                        <th>Rol</th>
                        <th>Fecha de creación</th>
                    </tr>
                    {
                        chefs.map(
                            chef =>
                                <EmployeeResume
                                    key={chef.R_USER_ID}
                                    empNo={chef.R_USER_ID}
                                    empName={chef.R_USER_NAME}
                                    empRole={chef.USER_ROLE}
                                    empDate={chef.CREATED_ON}
                                    onClick={onUpdateHandler}
                                />)
                    }
                </tbody>
            </table>
            { modalConfiguration && showFormModal(modalConfiguration)}
        </main>
    )
}

export default Employees;