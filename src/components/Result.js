
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from "react-csv";

export const Result = () => {

    // get formData form the store
    const formData = useSelector(state => state.stepFormData);
    const data = Object.values(formData);
    const [csvData, setCsvData] = useState([
        ["Project Name", "Project Description", "Client", "Contractor", "Max_X", "Max_Y", "Max_Z", "Min_X", "Min_Y", "Min_Z"],
    ]);

    useEffect(() => {
        setCsvData([
            ...csvData,
            data
        ]);
    }, []);


    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="fs-3 mb-5">Prototype table for the ABC company.</h3>
                        <CSVLink className="btn btn-primary" data={csvData} filename={"prototype.csv"}>Download as CSV</CSVLink>
                        <table className="table table-sm table-borderless mt-3">
                            <thead className="border-bottom">
                                <tr>
                                    <th scope="col" className="pt-2 pb-3">Project Name</th>
                                    <th scope="col" className="pt-2 pb-3">Project Description</th>
                                    <th scope="col" className="pt-2 pb-3">Client</th>
                                    <th scope="col" className="pt-2 pb-3">Contractor</th>
                                    <th scope="col" className="pt-2 pb-3">Max_X</th>
                                    <th scope="col" className="pt-2 pb-3">Max_Y</th>
                                    <th scope="col" className="pt-2 pb-3">Max_Z</th>
                                    <th scope="col" className="pt-2 pb-3">Min_X</th>
                                    <th scope="col" className="pt-2 pb-3">Min_Y</th>
                                    <th scope="col" className="pt-2 pb-3">Min_Z</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> {formData.projectname && formData.projectname}</td>
                                    <td> {formData.projectdescription && formData.projectdescription}</td>
                                    <td> {formData.client && formData.client}</td>
                                    <td> {formData.contractor && formData.contractor}</td>
                                    <td> {formData.max_X && formData.max_X}</td>
                                    <td> {formData.max_Y && formData.max_Y}</td>
                                    <td> {formData.max_Z && formData.max_Z}</td>
                                    <td> {formData.min_X && formData.min_X}</td>
                                    <td> {formData.min_Y && formData.min_Y}</td>
                                    <td> {formData.min_Z && formData.min_Z}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Result