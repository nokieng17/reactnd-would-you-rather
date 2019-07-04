
import { ADD_USER } from './../actions/users';
const user = (store) => (next) => (action) => {
    switch (action.type) {
        case ADD_USER:
            const { id, name, avatarUrl, password } = action
            if (id && name && avatarUrl && password) {
                return next(action)
            }
            console.log("invalid user input, skip action", action)
            return next()
        default:
            return next(action)
    }
}

export default user;