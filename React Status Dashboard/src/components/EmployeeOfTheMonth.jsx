import * as React from "react";

function EmployeeOfTheMonth(props) {
  //const escapedPhotoPath = props.name.replace(/\s+/g, "%20").replace("'", "%27") + "@2x.jpg";
  return (
    <div className='EmployeeOfTheMonth'>
      <div
        className='EmployeeOfTheMonth_photo'
        style={{
          //backgroundImage: `url(/img/employees/thumb/${escapedPhotoPath})`
          backgroundImage: `url(${props.PhotoURL})`,
        }}
      />
      <div className='EmployeeOfTheMonth_designation'>
        <div className='EmployeeOfTheMonth_name'>{props.FirstName + " " + props.LastName}</div>
        <div className='EmployeeOfTheMonth_title'>{props.Title + " (" + props.Branch + ")"}</div>
      </div>
    </div>
  );
}

export default EmployeeOfTheMonth;
