import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../api/blog.api";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();

      setName(res.data.user.name);
      setUsername(res.data.user.username || "");
      setBio(res.data.user.bio || "");
      setPreview(res.data.user.profilePicture || "");
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Save clicked");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("username", username);
      formData.append("bio", bio);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await updateProfile(formData);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-xl w-full max-w-lg space-y-5"
      >
        <h1 className="text-2xl text-white font-semibold text-center">
          Edit Profile
        </h1>

        {/* Image */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview || "https://via.placeholder.com/100"}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />

          <input
            type="file"
            onChange={(e) => {
              setProfilePicture(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="text-white"
          />
        </div>

        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 rounded bg-[#334155] text-white outline-none"
        />

        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 rounded bg-[#334155] text-white outline-none"
        />

        {/* Bio */}
        <textarea
          rows="4"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full p-3 rounded bg-[#334155] text-white outline-none"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-medium">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
