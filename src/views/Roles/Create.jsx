import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutDefault from '../../layouts/Default';
import Api from '../../api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function RoleCreate() {
    document.title = "Create Role - NewsApp Administartor";
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [permissionsData, setPermissionsData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const token = Cookies.get('token');
    const fetchDataPermissions = async () => {

        await Api.get('/api/admin/permissions/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            setPermissions(response.data.data);
        });
    }

    useEffect(() => {
        fetchDataPermissions();
    }, []);

    const handleCheckboxChange = (e) => {
        let data = permissionsData
        data.push(e.target.value)
        setPermissionsData(data)
    }

    const storeRole = async (e) => {
        e.preventDefault();

        await Api.post('/api/admin/roles', {

            name: name,
            permissions: permissionsData
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
        });

            navigate('/roles');
        }).catch(error => {
            setErrors(error.response.data);
        })
    }

    return (
        <LayoutDefault>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/roles" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button"><i className="fa fa-long-arrow-alt-left me-2"></i> Back</Link>
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6><i className="fa fa-shield-alt"></i> Create Role</h6>
                                <hr/>
                                <form onSubmit={storeRole}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Role Name</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Role Name"/>
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name[0]}
                                        </div>
                                    )}
                                    <hr/>
                                    <div className="mb-3">
                                        <label className="fw-bold">Permissions</label>
                                        <br/>
                                        {permissions.map((permission) => (
                                            <div className="form-check form-check-inline" key={Math.random()}>
                                                <input className="form-check-input" type="checkbox" 
                                                    value={permission.name}
                                                    onChange={handleCheckboxChange}
                                                    id={`check-${permission.id}`} 
                                                />
                                                <label className="form-check-label fw-normal" htmlFor={`check-${permission.id}`}>{ permission.name }</label>
                                            </div>
                                        ))}

                                        {errors.permissions && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.permissions[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-md btn-tertiary me-2"><i className="fa fa-save"></i> Save</button>
                                        <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDefault>
    )

}