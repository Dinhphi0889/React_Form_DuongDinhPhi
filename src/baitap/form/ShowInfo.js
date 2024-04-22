import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShowInfo extends Component {
    
    render() {
        const { students } = this.props
        return (
            <tr key={students.maSV}>
                <td>{students.maSV}</td>
                <td>{students.name}</td>
                <td>{students.phone}</td>
                <td>{students.email}</td>
                <td>
                    <button className='btn btn-success' onClick={() => this.props.editStudent(students)}>Sửa</button>
                    <button className='btn btn-danger' onClick={() => this.props.delStudent(students.maSV)}>Xóa</button>
                </td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delStudent: (maSV) => {
            const action = {
                type: "DELETE_STUDENT",
                payload: maSV,
            }
            dispatch(action)
        },
        editStudent: (student) => {
            const action = {
                type: "EDIT_STUDENT",
                payload: student,
            }
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps)(ShowInfo)