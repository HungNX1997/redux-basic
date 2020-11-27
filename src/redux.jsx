//khai bao sử dụng redux, redux-thunk
const redux = require('redux');
const reduxThunk = require('redux-thunk');

//Tạo const action type
const LOGIN = 'LOGIN';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const REQUESTING_DATA = 'REQUESTING_DATA';
const RECEIVED_DATA = 'RECEIVED_DATA';

//defaultState
const defaultLoginState = {
    isLogin: false
}

const defaultDataState = {
    fetching: false,
    users: []
}
// Tạo Redux store

//Xử lý hành động login
const loginReducer = (state = defaultLoginState, action) => {

    switch (action.type) {
        case LOGIN:
            return { isLogin: true, text: action.text };
        default:
            return state;
    }
}


const counterReducer = (state = 0, action) => {

    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

const asyncDataReducer = (state = defaultDataState, action) => {
    switch (action.type) {
        case REQUESTING_DATA:
            return {
                fetching: true,
                users: []
            }
        case RECEIVED_DATA:
            return {
                fetching: false,
                users: action.users
            }
        default:
            return state;
    }
};
// Tạo bộ công việc reducer

const rootReducer = redux.combineReducers({
    login: loginReducer,
    count: counterReducer,
    asyncData: asyncDataReducer
})
const store = redux.createStore(rootReducer, redux.applyMiddleware(reduxThunk.default));

//Tạo 1 trình lắng nghe các hành động trong cửa hàng

let isLogin = false;

store.subscribe(() => { isLogin = store.getState().login.isLogin })
//get state hiện tại
store.getState();
// define a redux action

const actionLogin = {
    type: 'LOGIN'
};

//define a redux action creator
// là 1 hàm trả về action

function actionLoginCreator(note) {
    //send action data to store
    const actionData = {
        type: LOGIN,
        text: note,
    }
    return actionData;
}

function actionIncrement() {
    return {
        type: INCREMENT
    }
}

function requestingData() {
    return { type: REQUESTING_DATA };
}
function receivedData(data) {
    return { type: RECEIVED_DATA, users: data.users }
}

const handleAsync = () => {
    return function (dispatch) {
        // Dispatch request action here
        store.dispatch(requestingData());
        setTimeout(function () {
            let data = {
                users: ['Jeff', 'William', 'Alice']
            }
            // Dispatch received data action here
            store.dispatch(receivedData(data));
            console.log(store.getState());
        }, 2500);
    }
};
//gửi yêu cầu hành động tới store

store.dispatch(handleAsync());
store.dispatch(actionLoginCreator('Wellcome to Redux!'));
store.dispatch(actionIncrement());
console.log(store.getState());
console.log('isLogin:', isLogin);

//state immutability when state is an array
//Một số method array sử dụng để immutability
const arrImmutable = [1, 3, 4, 8];
//sử dụng toán tử Spread 
//copy, và thay đổi trên newArr
let newArr1 = [...arrImmutable, 2, 4];

//sử dụng concat để nối 2 hay nhiều mảng với nhau
let newArr2 = [].concat(arrImmutable, newArr1);
//sử dụng slice() sẽ cho ra 1 mảng tham chiếu  nhận các giá trị
// từ begin tới end (2 tham số  này tùy chọn)
let newArr3 = arrImmutable.slice(1, 7);

console.log(arrImmutable);
console.log(newArr1);
console.log(newArr2);
console.log(newArr3);

//state immutability when state is an object
//Sử dụng Object.assign() hoặc spread operator
const objImmutable = { name: 'Hung', age: 23, country: 'Thanh Hóa' };
const newObj1 = Object.assign({}, objImmutable, { name: 'Đạt' });
const newObj2 = { ...objImmutable, name: 'Hà My' };

console.log(objImmutable);
console.log(newObj1);
console.log(newObj2);