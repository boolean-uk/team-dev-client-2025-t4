import "./style.css";
import useModal from '../../hooks/useModal';
import Card from '../card';
import ProfileCircle from '../profileCircle';

const UserListElement = ({ user }) => {
  const { openModal, setModal } = useModal();

  //const userInitials = user.name.match(/\b(\w)/g);

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
    <Card>
      <article className="user">
        <section className="user-details">
          <ProfileCircle initials={userInitials} />

          <div className="user-name">
            <p>{user.firstName} {user.lastName}</p>
          </div>

          <div className="edit-icon">
            <p onClick={showModal}>...</p>
          </div>
        </section>
      </article>
    </Card>
  );
}

export default UserListElement