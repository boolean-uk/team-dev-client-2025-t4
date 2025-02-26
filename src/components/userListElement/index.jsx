import "./style.css";
import useModal from '../../hooks/useModal';
import ProfileCircle from '../profileCircle';

const UserListElement = ({ user }) => {
  const { openModal, setModal } = useModal();

  let isTeacher = false;
  let cohort = '';

  if (!user.firstName || !user.lastName) {
    user.firstName = "Navn";
    user.lastName = "Navnesen";
  }

  if(user.role === 'TEACHER') {
    isTeacher = true;

    // Currently no endpoint for cohorts(?)
    cohort = 'Not a memebr of any cohort';
  }
  const userInitials = `${user.firstName[0] || ''}${user.lastName[0] || ''}`.toUpperCase();

  const showModal = () => {
    setModal('Edit user', <EditUserModal user={user} />);
    openModal();
  };

  console.log(user);
  return (
    <div className="user-container">
      <article className="user">
        <section className="user-details">
          <ProfileCircle initials={userInitials} />

          <div className="user-name">
            <h4>{user.firstName} {user.lastName}</h4>
            <p> {cohort}</p>
          </div>
          
          <div className="edit-icon">
            <p onClick={showModal}>...</p>
          </div>
        </section>
      </article>
    </div>
  );
}

export default UserListElement