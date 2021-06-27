import Admin from "../models/admin"

/// @route admin/profile
/// @desc login admin using email/password
/// @access private
const getAdmin = async (req, res, next) => {
    try {
        if (req.admin) {
            res.status(200).json({
                success: true,
                admin: req.admin
            })
        }
        else {
            res.status(401).json({
                success: false,
                msg: "Cannot found admin"
            })
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({
            success: false,
            msg: "System error"
        })
    }
}

/// @route admin/auth/signIn
/// @desc login admin using email/password
/// @access private
const adminSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        console.log(admin)
        if (!admin)
            return res.status(404).json({ success: false, message: 'email not registered yet' });
        if (!admin.comparePassword(password))
            return res.status(401).json({
                success: false,
                message: 'invalid credentials'
            });
        // login success
        delete admin.password;
        return res.status(200).json({
            success: true,
            token: admin.generateJWT(),
            admin: admin
        })
    } catch (error) {
        console.warn(error)
        return res.status(500).json({
            success: false,
            msg: "Error system",
            msgError: error
        })
    }
}

/// @route admin/auth/signUp
/// @desc login admin using email/password/firstName/lastName...
/// @access private
const adminSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log({ firstName, lastName, email, password })
        const admin = await Admin.findOne({ email });
        if (admin)
            return res.status(400).json({
                success: true,
                msg: "email already registred"
            })

        const newAdmin = new Admin({
            firstName, lastName, email,
            password,
        });
        await newAdmin.save();

        return res.status(200).json({
            success: true,
            admin: newAdmin
        })
    } catch (error) {
        console.warn(error)
        return res.status(500).json({
            success: false,
            msg: "System error",
            msgError: error
        })
    }
}

export {
    getAdmin,
    adminSignIn,
    adminSignUp
}