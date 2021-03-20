import React, { useState, useEffect } from 'react'
import { Steps, Button, } from 'antd';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import CSVReader from 'react-csv-reader';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const checkFileExtension = require('check-file-extension');


const StepForm = () => {
    const [current, setCurrent] = useState(0);
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [client, setClient] = useState('');
    const [contractor, setContractor] = useState('');
    const [maxX, setMaxX] = useState('');
    const [maxY, setMaxY] = useState('');
    const [maxZ, setMaxZ] = useState('');
    const [minX, setMinX] = useState('');
    const [minY, setMinY] = useState('');
    const [minZ, setMinZ] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const { Step } = Steps;
    const steps = [
        {
            title: 'First Step',
            content: '',
        },
        {
            title: 'Final Step',
            content: '',
        },
    ];

    const onSubmit = (formData) => {
        dispatch({
            type: 'FORM_DATA',
            payload: formData
        });
        history.push("/result");
        setMaxX('');
        setMaxY('');
        setMaxZ('');
        setMinX('');
        setMinY('');
        setMinZ('');
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const calculateMaxMin = (data) => {

        const expectedDataFormat = ["KP", "X", "Y", "Z"];
        const uploadedDataFormat = Object.keys(data[0]);
        const equals = (expectedDataFormat, uploadedDataFormat) => JSON.stringify(expectedDataFormat) === JSON.stringify(uploadedDataFormat);

        if (equals(expectedDataFormat, uploadedDataFormat) === false) {
            return toast.warning("Please input the expected data formate with consists of multiple values of KP, X, Y, Z Or input manually", { position: toast.POSITION.BOTTOM_RIGHT });
        } else {
            // value separate 
            let X = data.reduce(function (accumulator, item) {
                accumulator.push(item.X);
                accumulator.sort((a, b) => { return a - b });
                return accumulator;
            }, []);
            let Y = data.reduce(function (accumulator, item) {
                accumulator.push(item.Y);
                accumulator.sort((a, b) => { return a - b });
                return accumulator;
            }, []);
            let Z = data.reduce(function (accumulator, item) {
                accumulator.push(item.Z);
                accumulator.sort((a, b) => { return a - b });
                return accumulator;
            }, []);

            // value filterd
            let filterd_X = X.filter((i) => { return i !== undefined || null || '' });
            let filterd_Y = Y.filter((i) => { return i !== undefined || null || '' });
            let filterd_Z = Z.filter((i) => { return i !== undefined || null || '' });

            // X value
            let MAX_X = filterd_X[filterd_X.length - 1];
            let MIN_X = filterd_X[0];

            // Y value
            let MAX_Y = filterd_Y[filterd_Y.length - 1];
            let MIN_Y = filterd_Y[0];

            // Z value
            let MAX_Z = filterd_Z[filterd_Z.length - 1];
            let MIN_Z = filterd_Z[0];

            // return
            return { MAX_X, MIN_X, MAX_Y, MIN_Y, MAX_Z, MIN_Z };
        }

    }


    const csvRead = (data, fileInfo) => {
        if (checkFileExtension(fileInfo.name.toString()) !== '.csv') {
            return toast.error("Sorry! You have to must input CSV file", { position: toast.POSITION.BOTTOM_RIGHT });
        }
        if (fileInfo.name.toString().length < 0 || fileInfo.size < 0) {
            return toast.error("Oops! You have to must set a file name and put data", { position: toast.POSITION.BOTTOM_RIGHT });
        }
        if (data.length <= 0) {
            return toast.error("Data length has to be more than zero", { position: toast.POSITION.BOTTOM_RIGHT });
        }

        const { MAX_X, MIN_X, MAX_Y, MIN_Y, MAX_Z, MIN_Z } = data.length && calculateMaxMin(data);
        if (MAX_X !== undefined || MAX_Y !== undefined || MAX_Z !== undefined || MIN_X !== undefined || MIN_Y !== undefined || MIN_Z !== undefined) {
            setMaxX(MAX_X);
            setMaxY(MAX_Y);
            setMaxZ(MAX_Z);
            setMinX(MIN_X);
            setMinY(MIN_Y);
            setMinZ(MIN_Z);
            toast.success("Oh Yea! automatically loaded data in the below input filed", { position: toast.POSITION.BOTTOM_RIGHT });
        }
    };

    // component will unmount
    useEffect(() => {
        return () => toast.dismiss();
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '700px', margin: 'auto' }} className={'py-5'} >
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>

                <div className="steps-content my-5">
                    <div className="mb-3">
                        <label htmlFor="project-name" className="form-label">Project Name *</label>
                        <input htmltype="text" readOnly={current > 0 ? true : false} className="form-control" id="project-name" name="projectname" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} ref={register({ required: true })} />
                        <p className="text-danger">{(errors.projectname && projectName.toString().length < 1) && 'Project Name is required.'}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="project-description" className="form-label">Project Description *</label>
                        <textarea readOnly={current > 0 ? true : false} className="form-control" id="project-description" rows="3" name="projectdescription" value={projectDesc} onChange={(e) => { setProjectDesc(e.target.value) }} ref={register({ required: true })}></textarea>
                        <p className="text-danger">{(errors.projectdescription && projectDesc.toString().length < 1) && 'Project Description is required.'}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="client" className="form-label">Client *</label>
                        <input htmltype="text" readOnly={current > 0 ? true : false} className="form-control" id="client" name="client" value={client} onChange={(e) => { setClient(e.target.value) }} ref={register({ required: true })} />
                        <p className="text-danger">{(errors.client && client.toString() < 1) && 'Client is required.'}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contractor" className="form-label">Contractor *</label>
                        <input htmltype="text" readOnly={current > 0 ? true : false} className="form-control" id="contractor" name="contractor" value={contractor} onChange={(e) => { setContractor(e.target.value) }} ref={register({ required: true })} />
                        <p className="text-danger">{(errors.contractor && contractor.toString() < 1) && 'Contractor is required.'}</p>
                    </div>

                    {
                        current > 0 ?
                            <div className={'final-step-content'}>
                                <div className="mb-3">
                                    <CSVReader
                                        cssClass="csv-reader-input"
                                        label="Select CSV with consists of multiple values of KP, X, Y, Z. or input manually"
                                        parserOptions={{ header: true }}
                                        onFileLoaded={(data, fileInfo) => csvRead(data, fileInfo)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="max_X" className="form-label">Max_X *</label>
                                    <input type="number" className="form-control" id="max_X" name="max_X" value={maxX} onChange={(e) => { setMaxX(e.target.value) }} ref={register({ required: true })} />
                                    <p className="text-danger mb-0">{(errors.max_X && maxX.toString().length < 1) && 'Max_X is required.'}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="max_Y" className="form-label">Max_Y *</label>
                                    <input type="number" className="form-control" id="max_Y" name="max_Y" value={maxY} onChange={(e) => { setMaxY(e.target.value) }} ref={register({ required: true })} />
                                    <p className="text-danger mb-0">{(errors.max_Y && maxY.toString().length < 1) && 'Max_Y is required.'}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="max_Z" className="form-label">Max_Z *</label>
                                    <input type="number" className="form-control" id="max_Z" name="max_Z" value={maxZ} onChange={(e) => { setMaxZ(e.target.value) }} ref={register({ required: true })} />
                                    <p className="text-danger mb-0">{(errors.max_Z && maxZ.toString().length < 1) && 'Max_Z is required.'}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="min_X" className="form-label">Min_X *</label>
                                    <input type="number" className="form-control" id="min_X" name="min_X" value={minX} onChange={(e) => { setMinX(e.target.value) }} ref={register({ required: true })} />
                                    <p className="text-danger mb-0">{(errors.min_X && minX.toString().length < 1) && 'Min_X is required.'}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="min_Y" className="form-label">Min_Y *</label>
                                    <input type="number" className="form-control" id="min_Y" name="min_Y" value={minY} onChange={(e) => { setMinY(e.target.value) }} ref={register({ required: true })} />
                                    <p className="text-danger mb-0">{(errors.min_Y && minY.toString().length < 1) && 'Min_Y is required.'}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="min_Z" className="form-label">Min_Z *</label>
                                    <input type="number" className="form-control" id="min_Z" name="min_Z" value={minZ} onChange={(e) => { setMinZ(e.target.value) }} ref={register({ required: true })} />
                                    <p className="text-danger mb-0">{(errors.min_Z && minZ.toString().length < 1) && 'Min_Z is required.'}</p>
                                </div>
                            </div>
                            : null
                    }
                </div>

                <div className="steps-action mb-5">
                    {current > 0 && (
                        <Button className="btn btn-primary h-auto mr-2" onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button disabled={projectName.length > 0 && projectDesc.length > 0 && client.length > 0 && contractor.length > 0 ? false : true} className="btn btn-primary h-auto mr-2" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};


export default StepForm;

