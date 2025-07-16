import { useEffect } from 'react';
import SubHeader from '../../components/Doctor/SubHeader'

const Notification = () => {
  useEffect(() => {

    const notificationArray = JSON.parse(localStorage.getItem('notifications')) || [];
    console.log("Notifications:", notificationArray);

  }, []);
  return (

    <div>
      <SubHeader stype={"Notification"} />
      Notification
    </div>
  )
}

export default Notification