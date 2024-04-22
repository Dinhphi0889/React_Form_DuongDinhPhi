import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { connect } from 'react-redux'
import ShowInfo from './ShowInfo';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            maSV: "",
            name: "",
            phone: "",
            email: "",
        };
    }


    //Nhập thông tin từ form và lưu vào state
    handleOnChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
        if (name === "keyword") {
            this.props.searchStudent(value)

        }

    }


    //button submit
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.showStudent(this.state)
    }

    // Life Cycle: nhận data từ store để edit
    UNSAFE_componentWillReceiveProps = (nextProps) => {

        const { editStudent } = nextProps
        if (editStudent) {
            this.setState({
                id: editStudent.id,
                maSV: editStudent.maSV,
                name: editStudent.name,
                phone: editStudent.phone,
                email: editStudent.email,
            });
        } else {
            this.setState({
                id: "",
                maSV: "",
                name: "",
                phone: "",
                email: "",
            });
        }
    }


    //render bảng hiển thông tin/ tìm kiếm student
    renderListStudent = () => {
        const { listStudents, keyword } = this.props
        const studentFitler = listStudents.filter((student) => {
            return student.name?.toLowerCase()?.indexOf(keyword?.toLowerCase()) !== -1
        })
        // if (studentFitler && studentFitler.length > 0) {
        return studentFitler?.map((student) => {
            return <ShowInfo key={student.maSV} students={student} />
        })
        // }
    }

    render() {

        return (
            <div className='container'>
                <h2 className='bg-dark text-light d-flex justify-content-center'>Thông Tin Sinh Viên</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Mã Sinh viên</label>
                        <input name='maSV' type="input" className="form-control"
                            onChange={this.handleOnChange}
                            value={this.state.maSV} placeholder='VD: 123' />


                        <label>Họ Tên</label>
                        <input name='name' type="text" className="form-control" onChange={this.handleOnChange} value={this.state.name} placeholder='VD: Nguyen Van A' />
                    </div>

                    <div className="form-group">
                        <label>Số Điện Thoại</label>
                        <input name='phone' type="number" className="form-control" onChange={this.handleOnChange} value={this.state.phone} placeholder='VD: (+84) 123456789' />
                        <label>Email</label>
                        <input name='email' type="text" className="form-control" onChange={this.handleOnChange} value={this.state.email} placeholder='VD: example@gmail.com' />
                    </div>
                    <div className='functional'>
                        <div className='btnSubmit'>
                            <button type="submit" className="btn btn-success">Thêm Sinh Viên</button>
                        </div>
                        <div className=''>
                            <i className="fa-solid fa-magnifying-glass" style={{
                                fontSize: '20px',
                                marginRight: '10px'
                            }} ></i>
                            <input name='keyword' type='text' placeholder='Tìm Kiếm' onChange={this.handleOnChange}></input>
                        </div>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã Sinh Viên</th>
                            <th scope="col">Họ Tên</th>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListStudent()}
                    </tbody>

                </table>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showStudent: (student) => {
            const action = {
                type: 'SHOW_STUDENT',
                payload: student
            }
            dispatch(action)
        },
        searchStudent: (keyword) => {
            const action = {
                type: "SEARCH_STUDENT",
                payload: keyword,
            }
            dispatch(action)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        editStudent: state.studentReducer.editStudent,
        keyword: state.studentReducer.keywordSearch,
        listStudents: state.studentReducer.listStudents
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)