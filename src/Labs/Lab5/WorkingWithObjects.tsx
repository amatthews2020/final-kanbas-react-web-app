import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: "1", 
        name: "Learning NodeJS", 
        description: "Learning how to implementa server", 
        course: "CS4550",
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
    
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <h5>Modify Assignment Title</h5>
      <div >
        <a id="wd-update-assignment-title"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
            Update Title
        </a>
        <input className="form-control w-75" id="wd-assignment-title"
            defaultValue={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })}/>
      </div>
      <h5 className="mt-3">Modify Assignment Score</h5>
      <div>
        <a id="wd-update-assignment-score"
            className="btn btn-primary me-2 float-end"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
        </a>
          <input className="form-control w-75" id="wd-assignment-score" type="number"
            defaultValue={assignment.score} onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })}/>
      </div>
      <h5 className="mt-3">Modify Assignment Completed</h5>
      <div>
        <a id="wd-update-assignment-completed"
            className="btn btn-primary me-2"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
            Update Completed
        </a>
          <input className="form-check-input" id="wd-assignment-completed" type="checkbox"
            checked={assignment.completed} onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })}/>
      </div>
      <h5 className="mt-3">Modify Module Name</h5>
      <div>
        <a id="wd-update-module-name"
            className="btn btn-primary float-end"
            href={`${MODULE_API_URL}/name/${module.name}`}>
            Update Module Name
        </a>
        <input className="form-control w-75" id="wd-module-name"
            defaultValue={module.name} onChange={(e) =>
            setModule({ ...module, name: e.target.value })}/>
      </div>
      <h5 className="mt-3">Modify Module Description</h5>
      <div>
        <a id="wd-update-module-name"
            className="btn btn-primary float-end"
            href={`${MODULE_API_URL}/desc/${module.description}`}>
            Update Module Description
        </a>
        <input className="form-control w-75" id="wd-module-name"
            defaultValue={module.description} onChange={(e) =>
            setModule({ ...module, description: e.target.value })}/>
      </div>
      <hr />
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
         href={ASSIGNMENT_API_URL}>
        Get Assignment
      </a>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={MODULE_API_URL}>
        Get Module
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
         href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a><hr/>
      <h4>Modify Module</h4>
      <div>
        <a id="wd-update-module-name"
            className="btn btn-primary float-end"
            href={`${MODULE_API_URL}/name/${module.name}`}>
            Update Module Name
        </a>
        <input className="form-control w-75" id="wd-module-name"
            defaultValue={module.name} onChange={(e) =>
            setModule({ ...module, name: e.target.value })}/>
        <hr />
      </div>
    </div>
);}
