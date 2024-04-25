const initialState = {
    listStudents: [],
    editStudent: null,
    keywordSearch: "",
    errors: {
        id: "",
        maSV: "",
        name: "",
        phone: "",
        email: "",
    }
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {

        //Hiển thị/ thêm mới : student
        case 'SHOW_STUDENT':
            const student = action.payload
            const listStudentsClone = [...state.listStudents]
            if (student.id) {
                const index = listStudentsClone.findIndex((element) => element.id === student.id)
                if (index !== -1) {
                    listStudentsClone[index] = student
                }
            } else {
                const date = new Date();
                // clone user
                const newStudent = { ...student, id: date.getTime() };
                listStudentsClone.push(newStudent);
            }
            state.listStudents = listStudentsClone;
            return { ...state }


        //Xóa student
        case "DELETE_STUDENT":
            const listStudents = [...state.listStudents]
            const listStudentsFilter = listStudents.filter((student) =>
                student.maSV !== action.payload
            )
            state.listStudents = listStudentsFilter
            return { ...state }

        //Đổ data lên form để chỉnh sửa
        case "EDIT_STUDENT":
            state.editStudent = action.payload
            return { ...state }


        case 'SEARCH_STUDENT':
            state.keywordSearch = action.payload
            return { ...state }
        // case 'VALIDATION':
        //     let err = { ...state.errors}

        //     return { ...state }

        default:
            return { ...state }
    }
}

export default studentReducer