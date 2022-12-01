import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Rate from "../../common/rate";

const UserInfoCard = ({ userId, user }) => {
    const history = useHistory();
    const handleUserEdit = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={handleUserEdit}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="125"
                        height="125"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <Rate rate={user.rate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserInfoCard.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string.isRequired
};

export default UserInfoCard;
