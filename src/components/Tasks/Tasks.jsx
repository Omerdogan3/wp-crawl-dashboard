import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

export class Tasks extends Component {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };

  // handleRemove = (index) => {
  //   console.log(index)
  //   this.props.importedWebsites.splice(index, 1);
  // }

  render() {
    // const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    const tasks_title = this.props.importedWebsites;
    var tasks = [];
    var number;
    for (var i = 0; i < tasks_title.length; i++) {
      number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
              isChecked={true}
            />
          </td>
          <td>{tasks_title[i]}</td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default Tasks;
