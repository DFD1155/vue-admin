import request from '@/utils/request'

export default {
    pageListVo(page, limit, teacherquery) {
        return request({
            url: `/eduservice/eduteacher/${page}/${limit}`,
            method: 'post',
            data: teacherquery
        })
    },
    delTeacher(id) {
        return request({
            url: `/eduservice/eduteacher/${id}`,
            method: 'delete',
        })
    },
    save(eduTeacher) {
        return request({
            url: `/eduservice/eduteacher/addTeacher`,
            method: "post",
            data: eduTeacher
        })
    },
    getTeacherById(id) {
        return request({
            url: `/eduservice/eduteacher/getTeacherById/${id}`,
            method: "get",
        })
    },
    updateTeacherById(id, eduTeacher) {
        return request({
            url: `/eduservice/eduteacher/updateTeacherById/${id}`,
            method: "put",
            data: eduTeacher,
        })
    }

}