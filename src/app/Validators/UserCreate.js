const Yup = require('yup')

module.exports = async (request, response, next) => {
    const schema = Yup.object().shape({
        email: Yup
            .string()
            .email('Invalid email')
            .required('Please inform a email'),
        password: Yup
            .string()
            .required('Please inform a password')
            .min(4, 'Password need a minimum of 4 characters'),
        name: Yup
            .string()
            .required('Please inform a name')


    })

    try {
        await schema.validate(request.body)

        return next()
        
    } catch (error) {
        return response.status(400).send({ message: error.errors })
    }
}