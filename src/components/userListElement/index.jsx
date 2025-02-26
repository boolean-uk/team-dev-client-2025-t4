import "./style.css";
import useModal from '../../hooks/useModal';
import ProfileCircle from '../profileCircle';

const UserListElement = ({ user }) => {
  const { openModal, setModal } = useModal();

  if (!user.firstName || !user.lastName) {
    user.firstName = "Navn";
    user.lastName = "Navnesen";
  }
  const userInitials = `${user.firstName[0] || ''}${user.lastName[0] || ''}`.toUpperCase();


  const showModal = () => {
    setModal('Edit user', <EditUserModal user={user} />);
    openModal();
  };

  return (
    <div className="user-container">
      <article className="user">
        <section className="user-details">
          <ProfileCircle initials={userInitials} />

          <div className="user-name">
            <h4>{user.firstName} {user.lastName}</h4>
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