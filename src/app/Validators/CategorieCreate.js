const Yup = require('yup')
module.exports = async (request, response, next) => {
    const schema = Yup.object().shape({
        name: Yup
            .string('')
            .required('Please inform a name for categorie'),
        parent_id: Yup.number().notRequired()
    })
    try {
        await schema.validate(request.body)
        return next()
    } catch (error) {
        return response.statu(400).send(error.errors)
    }



}