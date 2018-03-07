import {NOTIFICATIONS} from "../constants";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import buildUrl from 'build-url';

export const uniqueArray = (arr, key )=>
{
    const temp = arr.map(el => el[key]);
    return arr.filter((el, i) =>
        temp.indexOf(el[key]) === i
    );
};

export const debounce = (func, delay) => {
    let inDebounce;
    return () => {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
};

export const displayNotification = (message, type=NOTIFICATIONS.SUCCESS)=>{
    switch (type)
    {
        case NOTIFICATIONS.SUCCESS:
            toastr.success(message);
            return;
        case NOTIFICATIONS.ERROR:
            toastr.error(message);
            return;
        case NOTIFICATIONS.WARNING:
            toastr.warning(message);
                return;
        default:
            return;
    }
};

export const buildApiUrl = (base, options={})=>buildUrl(base, {queryParams:options})
