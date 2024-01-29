import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Notifications, { notify } from 'react-notify-toast';
// import { toast, ToastContainer } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";
function NotificationsComponent(props) {
    useEffect(() => {
        navigator.serviceWorker.addEventListener('message', function handler(event) {
            let myColor = { background: 'black', text: "#FFFFFF" };
            let data= event.data.notification.title+ " "+event.data.notification.body
            notify.show(data,"success", 5000, myColor);
          });
    }, [])
 

    return (
     <>
     </>
    );
}

export default NotificationsComponent;