import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
const NotificationsIms = () => {
  const navigate = useNavigate();

  return (
    <div className="notif__wrapper">
      <div className="notif__top">
        <div className="transactions__backbutton" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={22} />
          <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
        </div>

        <section className="notif__right">
          <div className="print__notif">Print Notifications</div>
          <div className="clear__notif">Clear Notifications</div>
        </section>
      </div>
    </div>
  );
};

export default NotificationsIms;
